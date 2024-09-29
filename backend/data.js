const { sequelize } = require("./config/db");
const Report = require("./models/Report");

const seedDatabase = async () => {
  await sequelize.sync({ force: true }); // Clears existing data

  await Report.bulkCreate([
    {
      title: "Community Awareness",
      description: "Raising awareness on social justice issues.",
      location: "Community Center",
      status: "Pending",
    },
    {
      title: "Fundraising Event",
      description: "Organizing a fundraising event for local charities.",
      location: "Local Park",
      status: "Resolved",
    },
    {
      title: "Volunteer Program",
      description: "Launch a volunteer mentoring program.",
      location: "City Hall",
      status: "Pending",
    },
    {
      title: "Anti-Discrimination Rally",
      description: "Organizing a rally against discrimination.",
      location: "Downtown Square",
      status: "Resolved",
    },
    {
      title: "Petition for Policy Changes",
      description: "Petition for police reform policies.",
      location: "City Hall",
      status: "Pending",
    },
  ]);
};

seedDatabase()
  .then(() => {
    console.log("Database seeded successfully.");
    sequelize.close(); // Close the connection after seeding
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
    sequelize.close();
  });
