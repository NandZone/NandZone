import { CstNode, CstParser } from 'chevrotain';

import { hdlLexer, hdlVocabulary } from './hdlLexer';

export class HdlParser extends CstParser {
  constructor() {
    super(hdlVocabulary);
    this.performSelfAnalysis();
  }
  public chip = this.RULE('chip', () => {
    this.CONSUME(hdlVocabulary.Chip);
    this.CONSUME(hdlVocabulary.Identifier);

    this.CONSUME(hdlVocabulary.LeftBrace);
    this.MANY(() => {
      this.SUBRULE(this.chipSegment);
    });
    this.CONSUME(hdlVocabulary.RightBrace);
  });

  public chipSegment = this.RULE('chipSegment', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.inSegment) },
      { ALT: () => this.SUBRULE(this.outSegment) },
      { ALT: () => this.SUBRULE(this.partsSegment) },
    ]);
  });

  public inSegment = this.RULE('inSegment', () => {
    this.CONSUME(hdlVocabulary.In);
    this.SUBRULE(this.gateList);
    this.CONSUME(hdlVocabulary.Semicolon);
  });

  public outSegment = this.RULE('outSegment', () => {
    this.CONSUME(hdlVocabulary.Out);
    this.SUBRULE(this.gateList);
    this.CONSUME(hdlVocabulary.Semicolon);
  });

  public gateList = this.RULE('gateList', () => {
    this.MANY_SEP({
      SEP: hdlVocabulary.Comma,
      DEF: () => this.SUBRULE(this.gate),
    });
  });

  public gate = this.RULE('gate', () => {
    this.CONSUME(hdlVocabulary.Identifier);
    this.OPTION(() => {
      this.CONSUME(hdlVocabulary.LeftBracket);
      this.CONSUME(hdlVocabulary.Integer);
      this.CONSUME(hdlVocabulary.RightBracket);
    });
  });

  public partsSegment = this.RULE('partsSegment', () => {
    this.CONSUME(hdlVocabulary.Parts);
    this.CONSUME(hdlVocabulary.Colon);
    this.MANY(() => {
      this.SUBRULE(this.statement);
      this.CONSUME(hdlVocabulary.Semicolon);
    });
  });

  public statement = this.RULE('statement', () => {
    this.CONSUME(hdlVocabulary.Identifier);
    this.CONSUME(hdlVocabulary.LeftParen);
    this.SUBRULE(this.arguments);
    this.CONSUME(hdlVocabulary.RightParen);
  });

  public arguments = this.RULE('arguments', () => {
    this.AT_LEAST_ONE_SEP({
      SEP: hdlVocabulary.Comma,
      DEF: () => this.SUBRULE(this.argument),
    });
  });

  public argument = this.RULE('argument', () => {
    this.SUBRULE(this.variable);
    this.CONSUME(hdlVocabulary.Equal);
    this.SUBRULE2(this.variable);
  });

  public variable = this.RULE('variable', () => {
    this.OR([
      { ALT: () => this.CONSUME(hdlVocabulary.Value) },
      {
        ALT: () => {
          this.CONSUME(hdlVocabulary.Identifier);
          this.OPTION(() => {
            this.CONSUME(hdlVocabulary.LeftBracket);
            this.SUBRULE(this.arrayIndex);
            this.CONSUME(hdlVocabulary.RightBracket);
          });
        },
      },
    ]);
  });

  public arrayIndex = this.RULE('arrayIndex', () => {
    this.CONSUME(hdlVocabulary.Integer);
    this.OPTION(() => {
      this.CONSUME(hdlVocabulary.DoubleDot);
      this.CONSUME2(hdlVocabulary.Integer);
    });
  });
}

export const hdlParser = new HdlParser();

export const parseAsync = (text: string) =>
  new Promise<CstNode>((resolve, reject) => {
    const lexResult = hdlLexer.tokenize(text);
    hdlParser.input = lexResult.tokens;
    const cst = hdlParser.chip();
    if (hdlParser.errors.length > 0) return reject(hdlParser.errors);
    resolve(cst);
  });

export const parse = (text: string) => {
  const lexResult = hdlLexer.tokenize(text);
  hdlParser.input = lexResult.tokens;
  const cst = hdlParser.chip();
  if (hdlParser.errors.length > 0) throw new Error('hdl parse error:' + hdlParser.errors);
  return cst;
};
