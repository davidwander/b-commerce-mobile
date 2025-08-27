export type PartLeaf = {
  description: string;
  id: string;
  name: string;
  quantity?: number;  
  price?: number;
  categoryPath: string;
  categoryId: string;
  subcategoryId?: string;
  genderId?: string;
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
      {
        id: "subcat-006",
        name: "Tennis",
        children: [
          { id: "subsubcat-011", name: "Feminina" },
          { id: "subsubcat-012", name: "Masculina" }
        ],
      },
      {
        id: "subcat-007",
        name: "Botas",
        children: [
          { id: "subsubcat-013", name: "Feminina" },
          { id: "subsubcat-014", name: "Masculina" }
        ],
      },
      {
        id: "subcat-008",
        name: "Salto alto",
        children: [
          { id: "subsubcat-015", name: "Feminina" }
        ],
      },
      {
        id: "subcat-009",
        name: "Sapatilha",
        children: [
          { id: "subsubcat-016", name: "Feminina" }
        ],
      },
    ],
  },
  {
    id: "cat-004",
    name: "Acessórios",
    children: [
      {
        id: "subcat-010",
        name: "Óculos",
        children: [
          { id: "subsubcat-017", name: "Feminina" },
          { id: "subsubcat-018", name: "Masculina" }
        ],
      },
      {
        id: "subcat-011",
        name: "Bolsas",
        children: [
          { id: "subsubcat-019", name: "Feminina" },
          { id: "subsubcat-020", name: "Masculina" }
        ],
      },
      {
        id: "subcat-012",
        name: "Bijuteria",
        children: [
          { id: "subsubcat-021", name: "Feminina" },
          { id: "subsubcat-022", name: "Masculina" }
        ],
      },
      {
        id: "subcat-013",
        name: "Chapéus",
        children: [
          { id: "subsubcat-023", name: "Feminina" },
          { id: "subsubcat-024", name: "Masculina" }
        ],
      },
    ],
  },
  {
    id: "cat-005",
    name: "Saia",
    children: [
      { id: "subsubcat-025", name: "Feminina" }
    ]
  },
  {
    id: "cat-006",
    name: "Vestido",
    children: [
      { id: "subsubcat-026", name: "Feminina" }
    ]
  },
  {
    id: "cat-007",
    name: "Shorts",
    children: [
      {
        id: "subcat-014",
        name: "Casual",
        children: [
          { id: "subsubcat-027", name: "Feminina" },
          { id: "subsubcat-028", name: "Masculina" }
        ]
      },
      {
        id: "subcat-015",
        name: "Esportivo",
        children: [
          { id: "subsubcat-029", name: "Feminina" },
          { id: "subsubcat-030", name: "Masculina" }
        ]
      }
    ]
  },
  {
    id: "cat-008",
    name: "Biquíni",
    children: [
      { id: "subsubcat-031", name: "Feminina" }
    ]
  },
  {
    id: "cat-009",
    name: "Casacos",
    children: [
      {
        id: "subcat-016",
        name: "Jaqueta",
        children: [
          { id: "subsubcat-032", name: "Feminina" },
          { id: "subsubcat-033", name: "Masculina" }
        ]
      },
      {
        id: "subcat-017",
        name: "Blazer",
        children: [
          { id: "subsubcat-034", name: "Feminina" },
          { id: "subsubcat-035", name: "Masculina" }
        ]
      }
    ]
  }
];