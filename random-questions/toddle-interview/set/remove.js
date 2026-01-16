let users = [
    {
      id: 1,
      items: [{ id: "1", name: "Item 1" }]
    },
    {
      id: 2,
      items: []
    },
    {
      id: 3,
      items: [
        { id: "4", name: "Item 4" },
        { id: "5", name: "Item 5" }
      ]
    },
    {
      id: 4,
    }
  ];
  
  //Output - Remove those users who has empty items
  
  let output = [
    {
      id: 1,
      items: [{ id: "1", name: "Item 1" }]
    },
  
    {
      id: 3,
      items: [
        { id: "4", name: "Item 4" },
        { id: "5", name: "Item 5" }
      ]
    }
  ];