import { PrismaClient } from "../lib/generated/prisma";
import bcrypt from "bcryptjs";
import inquirer from "inquirer";
import { UserRole } from "../lib/permissions";

const prisma = new PrismaClient();

interface UserInput {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

async function promptUserInput(): Promise<UserInput> {
  console.log("\n👤 User Creation Tool\n");
  console.log("Fill in the details to create a new user:\n");

  // Step 1: Get email
  const { email } = await inquirer.prompt([
    {
      type: "input",
      name: "email",
      message: "Email address:",
      validate: (input: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!input.trim()) {
          return "Email is required";
        }
        if (!emailRegex.test(input.trim())) {
          return "Please enter a valid email address";
        }
        return true;
      },
      filter: (input: string) => input.trim().toLowerCase(),
    },
  ]);

  // Step 2: Get password and confirmation
  let password: string;
  let passwordConfirmed = false;
  
  while (!passwordConfirmed) {
    const passwordAnswers = await inquirer.prompt([
      {
        type: "password",
        name: "password",
        message: "Password:",
        mask: "*",
        validate: (input: string) => {
          if (!input) {
            return "Password is required";
          }
          if (input.length < 6) {
            return "Password must be at least 6 characters long";
          }
          return true;
        },
      },
      {
        type: "password",
        name: "confirmPassword",
        message: "Confirm password:",
        mask: "*",
        validate: (input: string) => {
          if (!input) {
            return "Please confirm your password";
          }
          return true;
        },
      },
    ]);

    if (passwordAnswers.password !== passwordAnswers.confirmPassword) {
      console.log("\n❌ Passwords do not match. Please try again.\n");
    } else {
      password = passwordAnswers.password;
      passwordConfirmed = true;
    }
  }

  // Step 3: Get name and role
  const { name, role } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Full name:",
      default: "",
      filter: (input: string) => input.trim(),
    },
    {
      type: "list",
      name: "role",
      message: "Select user role:",
      choices: [
        {
          name: "👑 Admin - Full access to all features",
          value: UserRole.ADMIN,
          short: "ADMIN",
        },
        {
          name: "👔 Manager - Can manage content but not admin features",
          value: UserRole.MANAGER,
          short: "MANAGER",
        },
        {
          name: "👁️  Viewer - Read-only access",
          value: UserRole.VIEWER,
          short: "VIEWER",
        },
      ],
      default: UserRole.VIEWER,
    },
  ]);

  return {
    email,
    password: password!,
    name: name || email.split("@")[0],
    role,
  };
}

async function confirmCreation(userInput: UserInput): Promise<boolean> {
  console.log("\n📋 Review your input:\n");
  console.log(`   Email: ${userInput.email}`);
  console.log(`   Name: ${userInput.name || "(not set)"}`);
  console.log(`   Role: ${userInput.role}`);
  console.log(`   Password: ${"*".repeat(userInput.password.length)}\n`);

  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "Create this user?",
      default: true,
    },
  ]);

  return confirm;
}

async function createUser(userInput: UserInput) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: userInput.email },
    });

    if (existingUser) {
      console.log(`\n❌ User with email ${userInput.email} already exists!`);
      console.log(`   ID: ${existingUser.id}`);
      console.log(`   Role: ${existingUser.role}`);
      process.exit(1);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userInput.password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        email: userInput.email,
        name: userInput.name || null,
        password: hashedPassword,
        role: userInput.role,
      },
    });

    console.log("\n✅ User created successfully!\n");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("   User Details:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`   ID:       ${user.id}`);
    console.log(`   Email:    ${user.email}`);
    console.log(`   Name:     ${user.name || "(not set)"}`);
    console.log(`   Role:     ${user.role}`);
    console.log(`   Created:  ${user.createdAt.toLocaleString()}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    console.log("📝 You can now login with these credentials.\n");
  } catch (error: any) {
    console.error("\n❌ Error creating user:", error.message);
    if (error.code === "P2002") {
      console.error("   This email is already in use.");
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  try {
    const userInput = await promptUserInput();
    const confirmed = await confirmCreation(userInput);

    if (!confirmed) {
      console.log("\n❌ User creation cancelled.\n");
      process.exit(0);
    }

    await createUser(userInput);
  } catch (error: any) {
    if (error.isTtyError) {
      console.error("\n❌ Prompt couldn't be rendered in the current environment.");
    } else {
      console.error("\n❌ An error occurred:", error.message);
    }
    process.exit(1);
  }
}

// Handle Ctrl+C gracefully
process.on("SIGINT", async () => {
  console.log("\n\n❌ Operation cancelled by user.\n");
  await prisma.$disconnect();
  process.exit(0);
});

main();

