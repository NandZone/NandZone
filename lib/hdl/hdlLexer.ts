import { ILexingResult, Lexer, createToken } from 'chevrotain';

const Chip = createToken({ name: 'Chip', pattern: /CHIP/i });
const In = createToken({ name: 'In', pattern: /IN/ });
const Out = createToken({ name: 'Out', pattern: /OUT/ });
const Parts = createToken({ name: 'Parts', pattern: /PARTS/ });
const Colon = createToken({ name: 'Colon', pattern: /:/ });
const Semicolon = createToken({ name: 'Semicolon', pattern: /;/ });
const Comma = createToken({ name: 'Comma', pattern: /,/ });
const Equal = createToken({ name: 'Equal', pattern: /=/ });
const LeftParen = createToken({ name: 'LeftParen', pattern: /\(/ });
const RightParen = createToken({ name: 'RightParen', pattern: /\)/ });
const LeftBracket = createToken({ name: 'LeftBracket', pattern: /\[/ });
const RightBracket = createToken({ name: 'RightBracket', pattern: /\]/ });
const LeftBrace = createToken({ name: 'LeftBrace', pattern: /{/ });
const RightBrace = createToken({ name: 'RightBrace', pattern: /}/ });
const DoubleDot = createToken({ name: 'DoubleDot', pattern: /\.\./ });

const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});
const SingleLineComment = createToken({
  name: 'SingleLineComment',
  pattern: /\/\/.*/,
  group: Lexer.SKIPPED,
});
const MultiLineComment = createToken({
  name: 'MultiLineComment',
  pattern: /\/\*[^]*?\*\//,
  group: Lexer.SKIPPED,
});

const Value = createToken({
  name: 'Value',
  pattern: /true|false/,
});
const Identifier = createToken({
  name: 'Identifier',
  pattern: /[a-zA-Z_][\w]*/,
});
const Integer = createToken({
  name: 'Integer',
  pattern: /\d+/,
});

export const hdlVocabulary = {
  WhiteSpace,
  SingleLineComment,
  MultiLineComment,

  Chip,
  In,
  Out,
  Parts,
  Colon,
  Semicolon,
  Comma,
  Equal,
  LeftParen,
  RightParen,
  LeftBracket,
  RightBracket,
  LeftBrace,
  RightBrace,
  DoubleDot,

  Value,
  Integer,
  Identifier,
} as const;
export const hdlTokensList = Object.values(hdlVocabulary);

export const hdlLexer = new Lexer(hdlTokensList);

export const tokenizeAsync = (inputText: string) =>
  new Promise<ILexingResult>((resolve, reject) => {
    const lexingResult = hdlLexer.tokenize(inputText);
    if (lexingResult.errors.length > 0) return reject(lexingResult.errors);
    resolve(lexingResult);
  });

export const tokenize = (inputText: string) => {
  const lexingResult = hdlLexer.tokenize(inputText);
  if (lexingResult.errors.length > 0) throw lexingResult.errors;
  return lexingResult;
};
