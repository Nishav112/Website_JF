import {
  TrendingUp,
  Landmark,
  PieChart,
} from "lucide-react";


export const NAV_LINKS = [
  "Home",
  "Services",
  "Payment",
  "Support",
  "About Us",
];

export const NAV_ROUTES = {
  Home: "/",
  Services: "/services",
  Payment: "/payment",
  Support: "/contact",
  "About Us": "/about",
};

export const BRANCHES = [
  {
    name: "Kathmandu",
    label: "Head Office",
    address: "Dharma Path, New Road, Kathmandu",
    phones: ["01-5356099", "01-5348202", "01-5312072"],
    mapQuery: "JF Securities Dharma Path New Road Kathmandu",
  },
  {
    name: "Damak",
    label: "Branch Office",
    address: "Jagriti Marga, Damak, Jhapa",
    phones: ["023-570540", "023-578540"],
    mapQuery: "https://www.google.com/maps/place/JF+Securities/@26.6621729,87.6861905,15.75z/data=!4m10!1m2!2m1!1sJF+Securities+Damak!3m6!1s0x39e58f0071758c87:0x4902641480c0be50!8m2!3d26.660548!4d87.6955398!15sChNKRiBTZWN1cml0aWVzIERhbWFrWhUiE2pmIHNlY3VyaXRpZXMgZGFtYWuSAQxzdG9ja19icm9rZXKaAURDaTlEUVVsUlFVTnZaRU5vZEhsalJqbHZUMnRhUzFkWWFIUlBSMVkxVWtod1ZWb3lTbEpUZWtaRlUwZGtjazVWUlJBQuABAPoBBAgAEBo!16s%2Fg%2F11vjydv8q7?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "Dang",
    label: "Branch Office",
    address: "Tulsipur, Dang",
    phones: ["082-590172", "082-590173"],
    mapQuery: "https://www.google.com/maps/place/JF+Securities+Tulsipur/@28.1315044,82.2910393,16z/data=!4m19!1m12!4m11!1m3!1m2!1s0x4cc4456a86b68713:0x5b7dcf55199f50ee!2sJF+Securities+Damak,+Damak,+Koshi+Province!1m6!1m2!1s0x3997f5a4fc42993d:0x1738775d9a731c5!2sJF+Securities+Tulsipur,+47JW%2BJXC,+Tulsipur,+Lumbini+Province+22412!2m2!1d82.297412!2d28.1315045!3m5!1s0x3997f5a4fc42993d:0x1738775d9a731c5!8m2!3d28.1315161!4d82.2973795!16s%2Fg%2F11rvdc7yg4?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D",
  },
];

export const TICKER_SEED = [
  { sym: "NABIL", name: "Nabil Bank", price: 812.4 },
  { sym: "HBL", name: "Himalayan Bank", price: 468.2 },
  { sym: "NLIC", name: "Nepal Life", price: 1042.6 },
  { sym: "ALICL", name: "Arun Valley", price: 355.9 },
  { sym: "SANIMA", name: "Sanima Bank", price: 289.5 },
  { sym: "NICA", name: "NIC Asia", price: 501.1 },
  { sym: "GBIME", name: "Global IME", price: 244.7 },
  { sym: "EBL", name: "Everest Bank", price: 612.3 },
  { sym: "LSL", name: "Laxmi Sunrise", price: 198.4 },
  { sym: "NIFRA", name: "Nepal Infra", price: 176.2 },
];

export const SERVICES = [
  {
    icon: TrendingUp,
    title: "Brokerage Services",
    desc: "Trading account opening, Buy and sell securities, adn settlement of the trade.",
  },
  {
    icon: Landmark,
    title: "DEMAT Services",
    desc: "Demat account opening, Meroshare activation, Pledge and release pledge for bank loan , BO to BO transfers, Death or Family transfers,etc.",
  },
  {
    icon: PieChart,
    title: "Margin Trading",
    desc: "Access financing to purchase eligible NEPSE-listed securities, increasing your trading capacity with flexible funding and responsible risk management.",
  },
];

export const STEPS = [
  {
    title: "Fill application form",
    desc: "Complete the KYC or online form with your basic details.",
  },
  {
    title: "Submit required documents",
    desc: "Upload your citizenship, photo , PAN number ,bank details and electricity bill.",
  },
  {
    title: "Complete KYC",
    desc: "We verify your identity per SEBON regulations.",
  },
  {
    title: "Account verification",
    desc: "Your DEMAT and trading accounts are activated.",
  },
  {
    title: "Start Trading",
    desc: "Log in and place your first order on NEPSE.",
  },
];

export const NOTICES = [];

export const PAYMENT_METHODS = [
  {
    name: "eSewa",
    sub: "Mobile wallet · Log in to pay",
    href: "https://esewa.com.np/",
    logo: "/payment-logos/esewa.png",
  },
  {
    name: "connectIPS",
    sub: "Bank transfer · Use company name as payee",
    href: "https://connectips.com/",
    logo: "/payment-logos/connectips.png",
  },
  {
    name: "Khalti",
    sub: "Mobile wallet · Log in to pay",
    href: "https://web.khalti.com/",
    logo: "/payment-logos/khalti.png",
  },
 
];

export const BANK_DETAILS = {
  bank: "Global IME Bank",
  branch: "Kamaladi Branch",
  accountName: "J.F. SECURITIES COMPANY PVT. LTD.",
  accountNumber: "07501010000745",
  email: "accounts@jfsecurities.com",
  viber: "9861413588",
};

export const GAINERS = [
  { name: "Nabil Bank", chg: "+6.12%" },
  { name: "Himalayan Bank", chg: "+4.25%" },
  { name: "Nepal Life", chg: "+3.07%" },
  { name: "Everest Bank", chg: "+2.60%" },
  { name: "Laxmi Sunrise", chg: "+2.41%" },
];

export const LOSERS = [
  { name: "Nepal Life", chg: "-2.16%" },
  { name: "Arun Valley", chg: "-1.80%" },
  { name: "Sanima Bank", chg: "-1.42%" },
  { name: "NIC Asia", chg: "-1.13%" },
  { name: "Global IME", chg: "-0.94%" },
];

export const KYC_DOWNLOADS = [
  {
  section: "3 in 1 Forms (TMS, DP, Mero Share)",
  forms: [
    {
      label: "3 in 1 Individual Form",
      href: "/forms/3 in 1 Individual Form.pdf",
    },
    {
      label: "3 in 1 Corporate Form",
      href: "/forms/3 in 1 Corporate Form.pdf",
    },
  ],
},

  {
    section: "Trading Forms",
    forms: [
      {
        label: "TMS Individual Form",
        href: "/forms/TMS Individual.pdf",
      },
      {
        label: "TMS Corporate Form",
        href: "/forms/TMS Corporate.pdf",
      },
      {
        label: "Order Form",
        href: "/forms/Order Form.pdf",
      },
    ],
  },

  {
    section: "DEMAT Forms",
    forms: [
      {
        label: "DP Individual Form",
        href: "/forms/DP Individual.pdf",
      },
      {
        label: "DP Corporate Form",
        href: "/forms/DP Corporate.pdf",
      },
      {
        label: "DIS Form",
        href: "/forms/DIS.pdf",
      },
      {
        label : "DRF Form",
        href: "/forms/DRF.pdf",
      },
    ],
  },

  {
    section: "Meroshare",
    forms: [
      {
        label: "Meroshare Application Form",
        href: "/forms/Mero Share.pdf",
      },
    ],
  },

  {
  section: "Additional Forms",
  forms: [
    {
      label: "BO to BO Transfer Form",
      href: "/forms/BO to BO.pdf",
    },
    {
      label: "CIC Self Declaration Form",
      href: "/forms/CIC.pdf",
    },
    {
      label: "WACC Form",
      href: "/forms/WACC.pdf",
    },
    {
      label: "In-person Verfication Form",
      href: "/forms/In-person Verification Form.pdf ",
    },
  ],
},

];

export const FAQS = [
  {
    q: "How do I open a trading account?",
    a: "Fill the KYC form thoroughly, enclose required documents, and submit to our service desk, and check your email inbox for acknowledgement message.",
  },
  {
    q: "What documents are required for KYC?",
    a: "For individuals: Copy of citizenship certificate, PAN card, NID Card, utility bills (electricity or water or voter card.)",
    b: "For minors: Enclose birth certificate along with aforesaid documents of the guardian.",
    c: "For institutions: Copy of company registraton certificate, Memorandum and Articles of Association, PAN, latest tax clearance, BOD minute for account opening and authroization to trade and sign documents, citizenship and NIN card of BOD members and account operator.",
  },
  {
    q: "What is a DEMAT account?",
    a: "A DEMAT account holds your shares electronically instead of paper certificates, and is required by CDS Nepal before you can trade on NEPSE.",
  },
  {
    q: "How can I deposit funds?",
    a: "Through Trade Management System (TMS) transfer funds for collateral deposit or make payment for buy bills to our bank account, for transfering funds you must have activated ConnectIPS or internet banking or ewallets like eSewa, Khalti,nd etc.",
  },
  {
    q: "How do I withdraw funds?",
    a: "Normally the proceeds of sale bill are transferred after T+2cycle, if you still have receivables from us submit your withdrawal request TMS or contact our accounts team.",
  },
];

export const IMPORTANT_INFORMATION = [
  {
    title: "Grievance Officer",
    description:
      "Information and contact details of the Grievance Officer.",
    type: "officer",
    role: "Grievance Officer",
    name: "Shishir Sharma",
    phone: "9847773840",
    email: "shishir.sharma@jfsecurities.com",
    message:
      "As the Grievance Officer, I am committed to ensuring that all client concerns, complaints, and feedback are handled fairly, transparently, and in a timely manner. We encourage our valued clients to share any grievances so that we can continuously improve our services and maintain the highest standards of customer satisfaction.",
  },
  /*{
    title: "Compliance Officer",
    description:
      "Information and contact details of the Compliance Officer.",
    type: "officer",
    role: "Compliance Officer",
    name: "Pradip Nepali",
    phone: "9847773626",
    email: "pradip@jfsecurities.com",
    message:
      "As the Compliance Officer, I am dedicated to ensuring that our organization operates in accordance with all applicable laws, regulations, and industry standards. We remain committed to ethical business practices, transparency, and safeguarding the interests of our clients and stakeholders.",
  },*/
  {
    title: "Targeted Sanction List",
    description: "View the Targeted Sanction List published by SEBON.",
    href: "https://www.moha.gov.np/page/targeted-sanction-list",
    external: true,
    type: "external",
  },
  {
    title: "UN Terrorist Sanction List",
    description:
      "View the United Nations Security Council Consolidated List.",
    href: "https://main.un.org/securitycouncil/en/content/un-sc-consolidated-list",
    external: true,
    type: "external",
  },
];
export const SERVICE_RATES = {
  minimumCharge: "Rs. 10/-",

  brokerage: [
    {
      amount: "Up to Rs. 50,000",
      rate: "0.36%",
    },
    {
      amount: "Rs. 50,001 – Rs. 5,00,000",
      rate: "0.33%",
    },
    {
      amount: "Rs. 5,00,001 – Rs. 20,00,000",
      rate: "0.31%",
    },
    {
      amount: "Rs. 20,00,001 – Rs. 1,00,00,000",
      rate: "0.27%",
    },
    {
      amount: "Above Rs. 1,00,00,000",
      rate: "0.24%",
    },
  ],

  governmentBonds: [
    {
      amount: "Up to Rs. 5,00,000",
      rate: "0.10%",
    },
    {
      amount: "Rs. 5,00,001 – Rs. 50,00,000",
      rate: "0.04%",
    },
    {
      amount: "Above Rs. 50,00,000",
      rate: "0.02%",
    },
  ],

  mutualFunds: [
    {
      amount: "Up to Rs. 5,00,000",
      rate: "0.15%",
    },
    {
      amount: "Rs. 5,00,001 – Rs. 50,00,000",
      rate: "0.12%",
    },
    {
      amount: "Above Rs. 50,00,000",
      rate: "0.10%",
    },
  ],

  additionalCharges: [
    {
      name: "DEMAT Charge",
      amount: "Rs. 25/-",
    },
    {
      name: "SEBON Fee",
      amount: "0.015%",
    },
  ],

  capitalGains: {
    institutional: "10% of profit",
    individual: [
      {
        period: "Holding period less than 1 year",
        rate: "5%",
      },
      {
        period: "Holding period more than 1 year",
        rate: "3.5%",
      },
    ],
  },

  tradingHours: {
    trading: "Monday to Friday, 11:00 AM – 3:00 PM",
    office: "Sunday to Friday, 9:00 AM – 5:00 PM",
    holiday: "Office remains closed on public holidays.",
  },
};
export const SUPPORT_TEAM = [
  {
    title: "Trading",
    email : "trading@jfsecurities.com",
    people: [{ name: "Purnima Ranjitkar", phone: "9861413588" }],
  },
  {
    title: "Accounts",
    email: "accounts@jfsecurities.com",
    people: [
      { name: "Dipika Shahi (Pay In )", phone: "9847773880" },
      { name: "Sajana Ranjitkar ( Pay Out )", phone: "9847774464" },
      { name: "Shishir Sharma", phone: "9847773840" },
    ],
  },
  {
    title: "Operations",
    email: "operations@jfsecurities.com",
    people: [
      { name: "Ajay Das Joshi (Share Transfer)", phone: "9843697582" },
      { name: "Rasila Sharma", phone: "9847770434" },
      { name: "Pradip Nepali (Settlement)", phone: "9847773626" },
    ],
  },
  {
    title: "Customer Service Department",
    email: "customercare@jfsecurities.com",
    people: [
      { name: "Yashodha Budhathoki", phone: "9847771097" },
      { name: "Muna Muktan", phone: "9847773155" },
    ],
  },
  {
    title: "Information & Technology ( IT )",
    email : "nishav.rayamajhi@jfsecurities.com",
    people: [{ name: "Nishav Rayamajhi", phone: "9847771057" }],
  },
  {
    title: "Tulsipur Branch",
    email : "tulsipur@jfsecurities.com",
    people: [
      { name: "Nikita Basnet", phone: "9748277114" },
      { name: "Nirmala Oli", phone: "9748277115" },
      { name: "Sabin Raj Dangi", phone: "9748277113" },
    ],
  },
  {
    title: "Damak Branch",
    email : "damak@jfsecurities.com",
    people: [
      { name: "Umesh Kafle", phone: "9748277124" },
      { name: "Saugat Gautam", phone: "9748277126" },
      { name: "Bharat Neupane", phone: "9748277123" },
    ],
  },
];
