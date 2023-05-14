import { hdlParser, parse, parseAsync } from './hdlParser';

const BaseHdlVisitor = hdlParser.getBaseCstVisitorConstructor();

export class HdlVisitor extends BaseHdlVisitor {
  constructor() {
    super();
    this.validateVisitor();
  }

  chip(ctx: any): HdlAst.Chip {
    const name = ctx.Identifier[0].image;
    const body = {
      in: undefined,
      out: undefined,
      parts: undefined,
    };
    ctx.chipSegment.forEach((child: any) => {
      const segment = this.visit(child);
      body[segment.type as keyof typeof body] = segment;
    });
    return {
      name,
      body,
    };
  }

  chipSegment(ctx: any): HdlAst.InSegment | HdlAst.OutSegment | HdlAst.PartsSegment {
    return this.visit(ctx.inSegment || ctx.outSegment || ctx.partsSegment);
  }

  inSegment(ctx: any): HdlAst.InSegment {
    return {
      type: 'in',
      gates: this.visit(ctx.gateList[0]),
    };
  }

  outSegment(ctx: any): HdlAst.OutSegment {
    return {
      type: 'out',
      gates: this.visit(ctx.gateList[0]),
    };
  }

  gateList(ctx: any): HdlAst.Gate[] {
    return (ctx.gate ?? []).map((child: any) => this.visit(child));
  }

  gate(ctx: any): HdlAst.Gate {
    const withLength = ctx.Integer !== undefined;
    return {
      name: ctx.Identifier[0].image,
      length: withLength ? parseInt(ctx.Integer[0].image, 10) : 1,
      location: this.getLocation(ctx.Identifier[0], withLength ? ctx.Integer[0] : undefined),
    };
  }

  partsSegment(ctx: any): HdlAst.PartsSegment {
    return {
      type: 'parts',
      statements: (ctx.statement ?? []).map((child: any) => this.visit(child)),
    };
  }

  statement(ctx: any): HdlAst.Statement {
    return {
      name: ctx.Identifier[0].image,
      arguments: this.visit(ctx.arguments[0]),
    };
  }

  arguments(ctx: any): HdlAst.Argument[] {
    return (ctx.argument ?? []).map((child: any) => this.visit(child));
  }

  argument(ctx: any): HdlAst.Argument {
    const lhs = this.visit(ctx.variable[0]);
    const rhs = this.visit(ctx.variable[1]);
    return {
      lhs,
      rhs,
      location: {
        start: lhs.location.start,
        end: rhs.location.end,
      },
    };
  }

  variable(ctx: any): HdlAst.Variable {
    if (ctx.Value) {
      return { value: ctx.Value[0].image === 'true', location: this.getLocation(ctx.Value[0]) };
    }
    const withArrayIndex = ctx.arrayIndex !== undefined;
    return {
      name: ctx.Identifier[0].image,
      arrayIndex: withArrayIndex ? this.visit(ctx.arrayIndex[0]) : null,
      location: this.getLocation(ctx.Identifier[0], withArrayIndex ? ctx.arrayIndex[0] : undefined),
    };
  }

  arrayIndex(ctx: any): HdlAst.ArrayIndex {
    if (!ctx.DoubleDot) {
      return {
        index: parseInt(ctx.Integer[0].image, 10),
        location: this.getLocation(ctx.Integer[0]),
      };
    }
    return {
      start: parseInt(ctx.Integer[0].image, 10),
      end: parseInt(ctx.Integer[1].image, 10),
      location: this.getLocation(ctx.Integer[0], ctx.Integer[1]),
    };
  }

  private getLocation(start: any, end?: any): HdlAst.Location['location'] {
    const _end = end ? end : start;
    return {
      start: {
        offset: start.startOffset,
        line: start.startLine,
        column: start.startColumn,
      },
      end: {
        offset: _end.endOffset,
        line: _end.endLine,
        column: _end.endColumn,
      },
    };
  }
}

export const hdlVisitor = new HdlVisitor();

export const toAst = (input: string) => {
  const cst = parse(input);
  return hdlVisitor.visit(cst) as HdlAst.Chip;
};

export const toAstAsync = async (input: string) => {
  const cst = await parseAsync(input);
  return hdlVisitor.visit(cst) as HdlAst.Chip;
};

export module HdlAst {
  export type Chip = {
    name: string;
    body: {
      in?: InSegment;
      out?: OutSegment;
      parts?: PartsSegment;
    };
  };

  export type InSegment = {
    type: 'in';
    gates: Gate[];
  };

  export type OutSegment = {
    type: 'out';
    gates: Gate[];
  };

  export type Gate = Location & {
    name: string;
    length: number;
  };

  export type PartsSegment = {
    type: 'parts';
    statements: Statement[];
  };

  export type Statement = {
    name: string;
    arguments: Argument[];
  };

  export type Argument = Location & {
    lhs: Variable;
    rhs: Variable;
  };

  export type Variable = ValueVariable | NameVariable;

  export type ValueVariable = Location & {
    value: boolean;
  };

  export type NameVariable = Location & {
    name: string;
    arrayIndex: ArrayIndex | null;
  };

  export type ArrayIndex = SimpleArrayIndex | RangeArrayIndex;

  export type SimpleArrayIndex = Location & {
    index: number;
  };

  export type RangeArrayIndex = Location & {
    start: number;
    end: number;
  };

  export type Location = {
    location: {
      start: {
        offset: number;
        line: number;
        column: number;
      };
      end: {
        offset: number;
        line: number;
        column: number;
      };
    };
  };
}

export type ChipType = HdlAst.Chip;
