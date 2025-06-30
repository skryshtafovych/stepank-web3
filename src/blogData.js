export const blogPosts = [
  {
    id: 1,
    title: "What Does Decentralized Hosting Mean for You?",
    author: "Stepank",
    date: "2025-06-30",
    tags: ["Web3", "Decentralization", "IPFS", "ENS", "Hosting"],
    summary: "A simple explanation of decentralized hosting and why it matters for the future of the web.",
    content: [
      {
        type: "paragraph",
        text: "Imagine your website like a book. In the old internet (what we now call Web2), that book lived in one giant, very fancy library building (a traditional server). If that library had a problem – a power outage, a fire, or if someone decided they didn't like your book and locked the doors – then no one could read it. Your website would be down. And for people to even find this specific library, there's a big, central phone book service (DNS) that tells everyone its exact street address."
      },
      {
        type: "paragraph",
        text: "But here at Stepank Web3, we're doing things differently. Our website isn't living in just one big, vulnerable library."
      },
      {
        type: "heading",
        level: 2,
        text: "1. Your Website is Everywhere, Like a Thousand Copies of Your Favorite Recipe!"
      },
      {
        type: "paragraph",
        text: "Instead of one central library, your website's content (all the words, pictures, and how it looks, which are just basic HTML, CSS, and JavaScript files) is copied and stored across hundreds, even thousands, of different computers all over the world. This is what we call IPFS (InterPlanetary File System)."
      },
      {
        type: "analogy",
        text: "Imagine you have a famous family recipe. Instead of keeping the only copy in your personal recipe box (a single server), you've given a copy to every trusted friend, family member, and neighbor. If your house (the central server) goes dark, everyone else still has a copy! This means your website is incredibly resilient. It's almost impossible to take down, censor, or lose because so many different \"keepers\" hold a piece of it. No single company or government can simply flip a switch and make it disappear."
      },
      {
        type: "heading",
        level: 2,
        text: "2. Finding Your Site: It's Got a Permanent Address, No Matter Where It's Stored."
      },
      {
        type: "paragraph",
        text: "In the old internet, a website's address (like stepank.com) pointed to a physical location – that one big library building. If the library moved, the address had to be updated, and sometimes old links would break. With IPFS, your website gets a unique \"content fingerprint.\" It's like your recipe isn't found by saying \"It's at Grandma's house,\" but by saying \"It's the recipe that tastes exactly like this, no matter whose kitchen it's in.\" This fingerprint is a permanent, unchangeable identifier for your site. Now, to make that fingerprint easy to remember, we use ENS (Ethereum Name Service)."
      },
      {
        type: "analogy",
        text: "ENS is like giving that unique \"recipe fingerprint\" a memorable, easy-to-say nickname, like stepank.eth. So instead of a long, confusing code, you just type stepank.eth, and your browser knows exactly which \"recipe\" (website) to find, no matter which \"kitchen\" (computer) is serving it up! This \"nickname\" lives on a global, public registry that no single company controls, making it truly yours."
      },
      {
        type: "heading",
        level: 2,
        text: "3. Simple, Smart, and Secure: Like a Well-Organized Rolodex that Everyone Shares."
      },
      {
        type: "paragraph",
        text: "You might be wondering about \"API calls\" and \"data.\" Think of it this way: your website is built using familiar, foundational web technologies – like a perfectly organized binder of notes and pictures. When your website needs information (like an update, or a list of items), it makes tiny, quick \"API calls.\""
      },
      {
        type: "analogy",
        text: "Imagine your website is a detective. Instead of going to one central police station (a traditional database) to get all its clues, it sends out tiny, encrypted messages to a vast network of other trusted detectives (decentralized data sources). Each detective only provides the specific piece of information asked for, and it's all verified by the network, not by a single boss. This makes everything transparent and secure. You're not relying on one company to guard all the secrets; the whole community is involved."
      },
      {
        type: "heading",
        level: 2,
        text: "Why does all this matter for you?"
      },
      {
        type: "paragraph",
        text: "It means this website isn't just online; it's unstoppable, uncensorable, and truly owned by its content creators and community, not by giant tech companies. It's a peek into a more open, resilient, and user-centric future for the internet."
      },
      {
        type: "paragraph",
        text: "So, explore stepank.com as you normally would, or if you're using a Web3-enabled browser, try stepank.eth to experience the decentralized web directly!"
      }
    ],
    media: [],
    extensible: true,
    featured: true,
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    slug: "what-does-decentralized-hosting-mean"
  },
  {
    id: 2,
    title: "Building Your First Smart Contract",
    author: "Stepank",
    date: "2025-01-15",
    tags: ["Solidity", "Ethereum", "Smart Contracts", "Development"],
    summary: "A beginner's guide to creating and deploying smart contracts on Ethereum using Solidity.",
    content: [
      {
        type: "paragraph",
        text: "Smart contracts are the building blocks of the decentralized world. Let's explore how to create your first one..."
      }
    ],
    media: [],
    extensible: true,
    featured: false,
    readTime: "12 min read",
    imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&h=250&fit=crop",
    slug: "building-first-smart-contract"
  },
  {
    id: 3,
    title: "DeFi Protocols: Understanding Yield Farming",
    author: "Stepank",
    date: "2025-01-10",
    tags: ["DeFi", "Yield Farming", "Liquidity", "Protocols"],
    summary: "Deep dive into yield farming strategies and how to navigate the DeFi ecosystem safely.",
    content: [
      {
        type: "paragraph",
        text: "Yield farming has become one of the most popular ways to earn passive income in the crypto space..."
      }
    ],
    media: [],
    extensible: true,
    featured: true,
    readTime: "15 min read",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    slug: "defi-protocols-yield-farming"
  },
  {
    id: 4,
    title: "NFTs Beyond Digital Art: Real-World Applications",
    excerpt: "Exploring how NFTs are being used in gaming, real estate, and identity verification.",
    content: "While NFTs are often associated with digital art, their potential applications extend far beyond...",
    author: "Stepan Kryshtafovych",
    publishDate: "2023-12-28",
    readTime: "6 min read",
    category: "NFTs",
    tags: ["NFTs", "Gaming", "Identity"],
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    slug: "nfts-beyond-digital-art"
  },
  {
    id: 5,
    title: "Layer 2 Solutions: Scaling Ethereum",
    excerpt: "Understanding how Layer 2 solutions like Polygon and Optimism are solving Ethereum's scalability issues.",
    content: "As Ethereum continues to grow, scalability has become a critical challenge. Layer 2 solutions offer a promising path forward...",
    author: "Stepan Kryshtafovych",
    publishDate: "2023-12-20",
    readTime: "10 min read",
    category: "Scaling",
    tags: ["Layer 2", "Polygon", "Optimism"],
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    slug: "layer-2-solutions-scaling-ethereum"
  },
  {
    id: 6,
    title: "Web3 Security Best Practices",
    excerpt: "Essential security tips for developers and users navigating the Web3 ecosystem.",
    content: "Security in Web3 is paramount. Here are the essential practices every developer and user should follow...",
    author: "Stepan Kryshtafovych",
    publishDate: "2023-12-15",
    readTime: "7 min read",
    category: "Security",
    tags: ["Security", "Best Practices", "Web3"],
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    slug: "web3-security-best-practices"
  }
];

export const categories = [
  { name: "All", slug: "all", count: blogPosts.length },
  { name: "Web3", slug: "web3", count: blogPosts.filter(post => post.tags.includes("Web3")).length },
  { name: "Development", slug: "development", count: blogPosts.filter(post => post.tags.includes("Development")).length },
  { name: "DeFi", slug: "defi", count: blogPosts.filter(post => post.tags.includes("DeFi")).length },
  { name: "Smart Contracts", slug: "smart-contracts", count: blogPosts.filter(post => post.tags.includes("Smart Contracts")).length }
]; 