export type PartLeaf = {
  id: string;
  name: string;
  quantity?: number;  
};

export type PartNode = {
  id: string;
  name: string;
  children?: Array<PartNode | PartLeaf>;
};

export const partsTree: PartNode[] = [
  {
    id: "cat-001",
    name: "Camisas",
    children: [
      {
        id: "subcat-001",
        name: "Camiseta",
        children: [
          { id: "subsubcat-001", name: "Feminina" },
          { id: "subsubcat-002", name: "Masculina" }
        ],
      },
      {
        id: "subcat-002",
        name: "Social",
        children: [
          { id: "subsubcat-003", name: "Feminina" },
          { id: "subsubcat-004", name: "Masculina" }
        ],
      },
      {
        id: "subcat-003",
        name: "Blusa",
        children: [
          { id: "subsubcat-005", name: "Feminina" },
          { id: "subsubcat-006", name: "Masculina" }
        ],
      },
    ],
  },
  {
    id: "cat-002",
    name: "Calça",
    children: [
      {
        id: "subcat-004",
        name: "Jeans",
        children: [
          { id: "subsubcat-007", name: "Feminina" },
          { id: "subsubcat-008", name: "Masculina" }
        ],
      },
      {
        id: "subcat-005",
        name: "Calça social",
        children: [
          { id: "subsubcat-009", name: "Feminina" },
          { id: "subsubcat-010", name: "Masculina" }
        ],
      },
    ],
  },
  {
    id: "cat-003",
    name: "Sapatos",
    children: [
      { id: "subcat-006", name: "Tennis" },
      { id: "subcat-007", name: "Botas" },
      { id: "subcat-008", name: "Salto alto" },
      { id: "subcat-009", name: "Sapatilha" },
    ],
  },
  {
    id: "cat-004",
    name: "Acessórios",
    children: [
      { id: "subcat-010", name: "Óculos" },
      { id: "subcat-011", name: "Bolsas" },
      { id: "subcat-012", name: "Bijuteria" },
      { id: "subcat-013", name: "Chapéus" },
    ],
  },
  {
    id: "cat-005",
    name: "Saia",
  },
  {
    id: "cat-006",
    name: "Vestido"
  },
  {
    id: "cat-007",
    name: "Shorts",
    children: [
      { id: "subcat-014", name: "Feminina" },
      { id: "subcat-015", name: "Masculina" }
    ]
  },
  {
    id: "cat-008",
    name: "Bequine"
  },
  {
    id: "cat-009",
    name: "Casacos",
    children: [
      { id: "subcat-016", name: "Feminina" },
      { id: "subcat-017", name: "Masculina" }
    ]
  }
];


