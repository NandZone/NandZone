export const hdlPath = './src/assets/data/hdl/';
export const getHdlPath = (name: (typeof hdlList)[number]) => hdlPath + name + '.hdl';

export const hdlList = [
  'Not',
  'And',
  'Or',
  'Xor',
  'Mux',
  'DMux',
  'And16',
  'Or16',
  'Mux16',
  'Or8Way',
  'Mux4Way16',
  'Mux8Way16',
  'DMux4Way',
  'DMux8Way',
  'HalfAdder',
  'FullAdder',
  'Add16',
  'Inc16',
  'ALU',
  'Bit',
  'Register',
  'RAM8',
  'RAM64',
  'RAM512',
  'RAM4K',
  'RAM16K',
  'PC',
  'CPU',
  'Computer',
] as const;