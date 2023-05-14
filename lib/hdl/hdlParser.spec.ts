import fs from 'fs';

import { CstElement, CstNode, IToken } from 'chevrotain';
import { getHdlPath, hdlList } from '../mocks/hdlIndex';
import { parse } from './hdlParser';

const isElementToken = (cstElement: IToken | CstNode): cstElement is IToken =>
  (cstElement as IToken).image !== undefined;

const removeIdx = (cstElement: CstElement) => {
  const isToken = isElementToken(cstElement);
  if (isToken) {
    delete (cstElement as Partial<IToken>).tokenTypeIdx;
    delete (cstElement as Partial<IToken>).tokenType?.tokenTypeIdx;
  } else {
    Object.values(cstElement.children).forEach((arr) => arr.forEach(removeIdx));
  }
};

describe('hdl parser', () => {
  describe('all the hdl files', () => {
    for (const name of hdlList) {
      it(`should parse "${name}.hdl" without errors and results should match snapshot`, () => {
        const text = fs.readFileSync(getHdlPath(name), 'utf8');
        const cst = parse(text);
        const clonedCst = JSON.parse(JSON.stringify(cst));
        removeIdx(clonedCst);
        expect(clonedCst).toMatchSnapshot();
      });
    }
  });
});
