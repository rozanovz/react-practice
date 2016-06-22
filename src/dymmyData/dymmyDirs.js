export default () => {
  return [
    {
      id: 1,
      name: "Corporative"
    },
    {
      id: 2,
      name: "Private",
      subDirectories: [
        {
          id: 3,
          name: "Family",
          subDirectories: [
            {
              id: 9,
              name: "Family_sub"
            },
            {
              id: 10,
              name: "Passwords_sub"
            }
          ]
        },
        {
          id: 4,
          name: "Passwords"
        }
      ]
    },
    {
      id: 5,
      name: "Other activities"
    },
    {
      id: 6,
      name: "Personal",
      subDirectories: [
        {
          id: 7,
          name: "Games"
        },
        {
          id: 8,
          name: "Friends"
        }
      ]
    },
  ];
}
