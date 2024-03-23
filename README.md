# ShanelAI: Your AI-Powered PDF Companion

ShanelAI is an advanced web application designed to revolutionize how you interact with PDFs. Simply upload any PDF document and ask AI to answer questions based on its content. This solution leverages the latest in web and AI technologies to provide a seamless, efficient, and intuitive user experience.

**Try it now: [ShanelAI_Live](https://shanelai-saas-platform.vercel.app/)**

![landing page](https://github.com/Md-Kaish-Alam/shanelai-saas-platform/assets/82415398/ec544bf8-6f7c-4e50-906d-ff1a1ac18c25)


## Capabilities and Innovations

- 🛠️ **Fully Customized SaaS Platform**: Meticulously engineered from the ground up, ShanelAI ensures optimal scalability and unmatched performance to meet the growing demands of both businesses and individuals.
  
- 💻 **Elegantly Designed Interface**: Featuring a professionally designed landing and pricing page, ShanelAI sets the stage for a premium user experience with an attention to detail and commitment to excellence.
  
- 💳 **Flexible Subscription Models**: ShanelAI accommodates a diverse range of user requirements with both free and premium subscription plans, integrated seamlessly with Stripe for secure, hassle-free payment processing.
  
- 📄 **Advanced PDF Interaction**: At its core, ShanelAI offers a sophisticated PDF viewer that redefines standards of document interaction, enabling intuitive and productive engagement with documents.
  
- 🔄 **Real-Time AI-Driven Insights**: Leveraging cutting-edge AI, ShanelAI delivers instant responses to queries, providing users with immediate access to insights directly from their uploaded PDFs.
  
- 🔒 **Secure Authentication with Kinde**: Integration with Kinde ensures a secure, swift authentication process, safeguarding user data while enhancing the overall user experience.
  
- 🎨 **Modern and Clean User Interface**: Utilizing 'shadcn-ui', ShanelAI features a clean, contemporary user interface designed for an enjoyable and efficient experience.
  
- 🚀 **Responsive UI Updates**: Implementing optimistic UI updates, ShanelAI offers a responsive interface that significantly improves the perceived speed and efficiency of the application.
  
- ⚡ **Efficient Message Handling**: Capable of infinite message loading, ShanelAI ensures a smooth, uninterrupted user experience, facilitating extensive data interaction without delay.
  
- 📤 **User-Friendly Upload Feature**: Designed for simplicity, our drag n’ drop upload functionality makes uploading PDF documents effortless.
  
- ✨ **Seamless Loading States**: Providing instant feedback during loading states, ShanelAI ensures a fluid and cohesive interaction throughout the platform.
  
- 🔧 **State-of-the-Art Data Management**: With tRPC & Zod for data fetching, ShanelAI enhances performance and reliability through efficient, type-safe data handling.
  
- 🧠 **LangChain Integration for Enhanced AI Capabilities**: Incorporating LangChain allows for infinite AI memory, enabling comprehensive and accurate responses to user queries.
  
- 🌲 **Pinecone Vector Storage**: Utilizing Pinecone for vector storage supports the platform's advanced AI features with scalable and efficient data management.
  
- 📊 **Robust Database Management with Prisma**: Our choice of Prisma as the ORM underscores a commitment to robust, flexible database management, ensuring seamless data operations.
  
- 🔤 **Fully TypeScript Implementation**: Developed entirely in TypeScript, ShanelAI is built on a foundation of reliable and maintainable code across the platform.
  
- 🎁 **And Beyond**: Constantly evolving, ShanelAI pushes the boundaries of what's possible, expanding its features to meet and exceed user expectations.


## Tech Stack

- **[Next.js 13.5 App Router](https://nextjs.org/docs/routing/introduction)**: The foundation of our app, providing server-side rendering and static site generation.
- **[tRPC](https://trpc.io/)**: Enables end-to-end typesafe APIs, enhancing development speed and reducing errors.
- **[TypeScript](https://www.typescriptlang.org/)**: Adds static type definitions to JavaScript, ensuring more robust code.
- **[Prisma](https://www.prisma.io/)**: Serves as our ORM for smooth database management.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[Kinde](https://kinde.com/)**: Provides secure and easy authentication.
- **[Stripe](https://stripe.com/)**: Integrates payment processing for handling subscriptions and purchases.
- **[LangChain](https://langchain.com/)**: Powers the AI, providing infinite memory capabilities.
- **[Pinecone](https://www.pinecone.io/)**: Manages our vector database for scalable AI operations.
- **[Uploadthing](https://uploadthing.com/)**: A simple and efficient service for storing PDF files.


## Application Screenshots

**After login user dashboard page**

![after login user dashboard page](https://github.com/Md-Kaish-Alam/shanelai-saas-platform/assets/82415398/80351bf8-3242-40af-b55a-ba49991c3238)

**PDF uploading section**

![pdf upload modal](https://github.com/Md-Kaish-Alam/shanelai-saas-platform/assets/82415398/dc6cca13-3dd0-422a-a369-4bab36fbc470)

**Asking Questions about the pdf**

![Screenshot 2024-03-23 105928](https://github.com/Md-Kaish-Alam/shanelai-saas-platform/assets/82415398/e311311f-1821-417c-afb6-dc44e2e0a17b)

![Screenshot 2024-03-23 110003](https://github.com/Md-Kaish-Alam/shanelai-saas-platform/assets/82415398/2ef4cb3c-1c56-441a-9c65-d6e074df1723)

**Pricing Page**

![Pricing page](https://github.com/Md-Kaish-Alam/shanelai-saas-platform/assets/82415398/7223435a-cfc8-496f-b4b7-5bef228ea12f)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (LTS version recommended)
- A MySQL database , I used pinecode
- Kinde account for authentication
- Stripe account for managing subscriptions
- OpenAI account copying API secret key

Before you begin, ensure you have the latest version of npm installed:
```bash
npm install npm@latest -g
```
### Installation
- **Clone the repo**
  
```bash
git clone https://github.com/Md-Kaish-Alam/shanelai-saas-platform.git
```
- **Install NPM packages**
  
```bash
npm install
```

- **Setup environment variables**

Create a `.env.local` file in the root of the project directory and fill it with your own values:

```plaintext
# Authentication
KINDE_CLIENT_ID=your_kinde_client_id
KINDE_CLIENT_SECRET=your_kinde_client_secret
KINDE_ISSUER_URL=https://your_kinde_project_name.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard

# Database
DATABASE_URL=your_database_url

# PDF Storage
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id

# AI Service
OPENAI_API_KEY=your_openai_api_key

# Payment Processing
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Vector Database
PINECONE_API_KEY=your_pinecone_api_key

```

- **Running the project**
  
After installation, you can start the project locally using npm command:
```bash
npm run dev
```
This command starts the developement server on `http://localhost:3000/`. Open your browser and navigate to this address to view the application.


## Deployment

Deploying your application can be done with various hosting services, but here we'll focus on deploying with [Vercel](https://vercel.com), the creators of Next.js. Vercel simplifies the deployment process and offers a seamless experience for Next.js applications.

### Steps for Deployment on Vercel:

1. **Sign Up/Login to Vercel**: First, create an account on Vercel if you don't already have one.

2. **Connect Your GitHub Repository**: Once logged in, you can connect your GitHub account and select the repository where your app resides.

3. **Configure Your Project**: After selecting your repository, Vercel will prompt you to configure your project. You should specify the build commands and output directory if they're not automatically detected. For a typical Next.js app, the default settings usually work out of the box.

4. **Environment Variables**: Input the necessary environment variables that your application requires (e.g., `KINDE_CLIENT_ID`, `KINDE_CLIENT_SECRET` , `KINDE_ISSUER_URL`, `KINDE_SITE_URL` , `KINDE_POST_LOGOUT_REDIRECT_URL`, `KINDE_POST_LOGIN_REDIRECT_URL`). Vercel allows you to set these securely in the project settings.

5. **Deploy**: With your project configured, you can proceed with the deployment. Vercel will build your application and provide a URL to access it live on the web.

6. **Continuous Deployment**: Any subsequent pushes to your repository (e.g., to the main branch) will trigger automatic deployments, ensuring your live application is always up to date.

For alternative deployment options and more detailed instructions, refer to the official [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## Conclusion

ShanelAI stands at the intersection of innovation and practicality, embodying a future where AI integration into everyday tools enhances productivity, fosters creativity, and unlocks new potentials. With its robust features, intuitive design, and powerful AI capabilities, ShanelAI is more than just a software application—it's a testament to what's possible when technology is harnessed to empower users. Whether you're a student, researcher, professional, or simply someone looking to extract maximum value from PDF documents, ShanelAI offers an unparalleled experience. As we continue to evolve and integrate user feedback, our commitment remains steadfast: to deliver a tool that not only meets but exceeds your expectations, pushing the boundaries of AI and PDF interaction.

## License

MIT License

Copyright (c) @2023 [mdkaishalam] | ShanelAI
