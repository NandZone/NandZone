import { IToken, TokenType, tokenMatcher } from 'chevrotain';

import { hdlLexer, hdlVocabulary } from './hdlLexer';

const matchTokens = (tokens: IToken[], tokenTypes: TokenType[]) => {
  expect(tokens).toHaveLength(tokenTypes.length);
  tokens.forEach((token, index) => {
    expect(tokenMatcher(token, tokenTypes[index])).toBe(true);
  });
};

describe('hdl lexer', () => {
  describe('keywords', () => {
    it('should match CHIP', () => {
      const tokens = hdlLexer.tokenize('CHIP');
      matchTokens(tokens.tokens, [hdlVocabulary.Chip]);
    });

    it('should match IN', () => {
      const tokens = hdlLexer.tokenize('IN');
      matchTokens(tokens.tokens, [hdlVocabulary.In]);
    });

    it('should match OUT', () => {
      const tokens = hdlLexer.tokenize('OUT');
      matchTokens(tokens.tokens, [hdlVocabulary.Out]);
    });

    it('should match PARTS', () => {
      const tokens = hdlLexer.tokenize('PARTS');
      matchTokens(tokens.tokens, [hdlVocabulary.Parts]);
    });
  });

  describe('punctuation', () => {
    it('should match colon', () => {
      const tokens = hdlLexer.tokenize(':');
      matchTokens(tokens.tokens, [hdlVocabulary.Colon]);
    });

    it('should match semicolon', () => {
      const tokens = hdlLexer.tokenize(';');
      matchTokens(tokens.tokens, [hdlVocabulary.Semicolon]);
    });

    it('should match comma', () => {
      const tokens = hdlLexer.tokenize(',');
      matchTokens(tokens.tokens, [hdlVocabulary.Comma]);
    });

    it('should match equal', () => {
      const tokens = hdlLexer.tokenize('=');
      matchTokens(tokens.tokens, [hdlVocabulary.Equal]);
    });

    it('should match left paren', () => {
      const tokens = hdlLexer.tokenize('(');
      matchTokens(tokens.tokens, [hdlVocabulary.LeftParen]);
    });

    it('should match right paren', () => {
      const tokens = hdlLexer.tokenize(')');
      matchTokens(tokens.tokens, [hdlVocabulary.RightParen]);
    });

    it('should match left bracket', () => {
      const tokens = hdlLexer.tokenize('[');
      matchTokens(tokens.tokens, [hdlVocabulary.LeftBracket]);
    });

    it('should match right bracket', () => {
      const tokens = hdlLexer.tokenize(']');
      matchTokens(tokens.tokens, [hdlVocabulary.RightBracket]);
    });

    it('should match left brace', () => {
      const tokens = hdlLexer.tokenize('{');
      matchTokens(tokens.tokens, [hdlVocabulary.LeftBrace]);
    });

    it('should match right brace', () => {
      const tokens = hdlLexer.tokenize('}');
      matchTokens(tokens.tokens, [hdlVocabulary.RightBrace]);
    });

    it('should match double dot', () => {
      const tokens = hdlLexer.tokenize('..');
      matchTokens(tokens.tokens, [hdlVocabulary.DoubleDot]);
    });
  });

  it('should accept identifiers', () => {
    const tokens = hdlLexer.tokenize('a1 a2 a3 a4 a5 a6 a7 a8 a9 _a _1 _2 _3 _4 _5 _6 _7 _8 _9');
    matchTokens(tokens.tokens, Array(19).fill(hdlVocabulary.Identifier));
  });

  describe('Integer', () => {
    it('should accept digits', () => {
      const tokens = hdlLexer.tokenize('0 1 2 3 4 5 6 7 8 9');
      matchTokens(tokens.tokens, Array(10).fill(hdlVocabulary.Integer));
    });

    it('should accept numbers', () => {
      const tokens = hdlLexer.tokenize('123 456 789 123456789');
      matchTokens(tokens.tokens, Array(4).fill(hdlVocabulary.Integer));
    });
  });

  describe('Whitespace', () => {
    it('should skip whitespace', () => {
      const tokens = hdlLexer.tokenize(' \t\n\r\v\f');
      matchTokens(tokens.tokens, []);
    });
  });

  describe('Comments', () => {
    it('should skip single line comments', () => {
      const tokens = hdlLexer.tokenize('// comment');
      matchTokens(tokens.tokens, []);
    });

    it('should skip multi line comments', () => {
      const tokens = hdlLexer.tokenize('/* \n comment ** //// \n\t **/');
      matchTokens(tokens.tokens, []);
    });
  });

  it('should accept a full example', () => {
    const tokens = hdlLexer.tokenize(
      'CHIP Not { IN in; OUT out; PARTS: Nand(a=in, b=in, out=out); }',
    );
    matchTokens(tokens.tokens, [
      hdlVocabulary.Chip,
      hdlVocabulary.Identifier,
      hdlVocabulary.LeftBrace,
      hdlVocabulary.In,
      hdlVocabulary.Identifier,
      hdlVocabulary.Semicolon,
      hdlVocabulary.Out,
      hdlVocabulary.Identifier,
      hdlVocabulary.Semicolon,
      hdlVocabulary.Parts,
      hdlVocabulary.Colon,
      hdlVocabulary.Identifier,
      hdlVocabulary.LeftParen,
      hdlVocabulary.Identifier,
      hdlVocabulary.Equal,
      hdlVocabulary.Identifier,
      hdlVocabulary.Comma,
      hdlVocabulary.Identifier,
      hdlVocabulary.Equal,
      hdlVocabulary.Identifier,
      hdlVocabulary.Comma,
      hdlVocabulary.Identifier,
      hdlVocabulary.Equal,
      hdlVocabulary.Identifier,
      hdlVocabulary.RightParen,
      hdlVocabulary.Semicolon,
      hdlVocabulary.RightBrace,
    ]);
  });
});
