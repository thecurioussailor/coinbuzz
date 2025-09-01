# CoinBuzz 🚀

A modern Web3 dashboard built with Next.js that allows users to connect their Phantom wallet and track live SOL/BONK prices from the Birdeye API.

## ✨ Features

- **🔗 Phantom Wallet Integration** - Connect and manage your Solana wallet
- **�� Live Price Feeds** - Real-time SOL and BONK price updates every 5 seconds
- **�� Wallet Balance** - View your SOL balance and USD equivalent
- **🎨 Modern UI** - Clean, responsive design with dark theme
- **⚡ Real-time Updates** - Automatic price polling and balance updates
- **📱 Responsive Design** - Works seamlessly on desktop and mobile

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Solana Web3.js
- **Wallet**: Phantom Wallet Adapter
- **API**: Birdeye API for price data
- **Package Manager**: pnpm

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Birdeye API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd coinbuzz
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure
coinbuzz/
├── app/
│ ├── api/price/ # Birdeye API proxy route
│ ├── dashboard/ # Dashboard pages
│ ├── layout.tsx # Root layout with wallet provider
│ └── page.tsx # Landing page
├── components/
│ ├── Navbar.tsx # Top navigation bar
│ ├── Sidebar.tsx # Dashboard sidebar
│ └── WalletContextProvider.tsx # Solana wallet context
├── public/ # Static assets

## 🔧 API Integration

The project uses Birdeye API for real-time price data:

- **SOL**: `So11111111111111111111111111111111111111112`
- **BONK**: `DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263`

### Getting a Birdeye API Key

1. Visit [Birdeye API](https://docs.birdeye.so/reference/overview)
2. Sign up for an account
3. Generate your API key
4. Add it to your `.env.local` file

## 🎯 Usage

1. **Landing Page**: Visit the homepage to see the project overview
2. **Connect Wallet**: Click "Dashboard" to navigate to the main interface
3. **Connect Phantom**: Use the wallet button in the navbar to connect
4. **View Prices**: See live SOL/BONK prices updating every 5 seconds
5. **Check Balance**: View your SOL balance and USD equivalent

## 🚀 Deployment

### Build for Production

```bash
pnpm build
pnpm start
```

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `BIRDEYE_API_KEY` to Vercel environment variables
4. Deploy!

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `BIRDEYE_API_KEY` | Your Birdeye API key for price data | Yes |
| `NEXT_PUBLIC_SOLANA_RPC` | Custom Solana RPC endpoint | No |

## 📝 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is built for a Web3 developer trial assessment.

---

Built with ❤️ for the Web3 ecosystem