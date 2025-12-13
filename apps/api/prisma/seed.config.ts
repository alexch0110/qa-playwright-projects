export const seedConfig = {
  user: {
    email: "test@example.com",
    password: "password123",
  },
  projects: [
    {
      name: "QA Learning",
      todos: [
        { title: "Finish Playwright basics", completed: true },
        { title: "Add Allure report", completed: false },
      ],
    },
    {
      name: "Pet project",
      todos: [
        { title: "Implement CI", completed: false },
        { title: "Dockerize app", completed: false },
      ],
    },
  ],
};
