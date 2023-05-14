import fs from 'fs';

import { getHdlPath, hdlList } from '../mocks/hdlIndex';
import { toAst } from './hdlVisitor';

describe('hdl visitor', () => {
  describe('all the hdl files', () => {
    for (const name of hdlList) {
      it(`should visit "${name}.hdl" without errors and results should match snapshot`, () => {
        const text = fs.readFileSync(getHdlPath(name), 'utf8');
        const ast = toAst(text);
        expect(ast).toMatchSnapshot();
      });
    }
  });
});
