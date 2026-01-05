import { Scheme } from "../types/advisory";

// REAL DATA - Sourced from official portals (pmkisan.gov.in, myscheme.gov.in)
// As of 2024-2025

export const ALL_SCHEMES: Scheme[] = [
    {
        id: "PM_KISAN",
        name: "PM-KISAN Samman Nidhi",
        type: "Income Support",
        state: "All",
        central: true,
        eligibility: {
            maxLandHolding: 5, // Generally for Small & Marginal, strictly < 2 hectares (~5 acres)
            farmerType: ["Small", "Marginal"],
        },
        benefits: "₹6,000 per year in 3 equal installments",
        applyLink: "https://pmkisan.gov.in",
        description: "Direct income support of ₹6,000 per year to eligible farmer families to meet farm input costs.",
        docsRequired: ["Aadhaar Card", "Land Ownership Documents", "Bank Account Details"]
    },
    {
        id: "PMFBY",
        name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        type: "Crop Insurance",
        state: "All",
        central: true,
        eligibility: {
            // Available to all, but subsidized rates differ
            farmerType: ["Small", "Marginal", "Large", "All"],
        },
        benefits: "Insurance cover against crop loss due to non-preventable natural risks.",
        applyLink: "https://pmfby.gov.in",
        description: "Comprehensive crop insurance scheme to provide financial support to farmers suffering crop loss/damage.",
        docsRequired: ["Land Possession Certificate (LPC)", "Aadhaar Card", "Bank Passbook", "Sowing Certificate"]
    },
    {
        id: "KCC",
        name: "Kisan Credit Card (KCC)",
        type: "Credit / Loan",
        state: "All",
        central: true,
        eligibility: {
            farmerType: ["Small", "Marginal", "Large", "All"],
        },
        benefits: "Low interest loans (effective 4%) for farming needs.",
        applyLink: "https://www.myscheme.gov.in/schemes/kcc",
        description: "Adequate and timely credit support from the banking system under a single window with flexible and simplified procedure.",
        docsRequired: ["Identity Proof", "Address Proof", "Land Documents"]
    },
    {
        id: "NMB",
        name: "Nutrient Based Subsidy (Fertilizer)",
        type: "Subsidy",
        state: "All",
        central: true,
        eligibility: {
            farmerType: ["Small", "Marginal", "Large", "All"],
        },
        benefits: "Subsidized Urea, DAP, manufacturing cost compensated by Govt.",
        applyLink: "https://fert.nic.in",
        description: "Government provides fertilizers to farmers at subsidized rates to ensure balanced nutrient application.",
        docsRequired: ["Aadhaar Card (for POS machine purchase)"]
    },
    {
        id: "BR_RKVY",
        name: "Rashtriya Krishi Vikas Yojana (Bihar)",
        type: "Infrastructure / Subsidy",
        state: "Bihar",
        central: false,
        eligibility: {
            farmerType: ["Small", "Marginal", "Large", "All"],
        },
        benefits: "Financial aid for agriculture infrastructure and mechanization.",
        applyLink: "https://state.bihar.gov.in/krishi/CitizenHome.html",
        description: "State-implemented scheme to boost agriculture sector growth and infrastructure.",
        docsRequired: ["LPC", "Aadhaar", "Bank Details"]
    },
    {
        id: "BR_DSL_SUB",
        name: "Bihar Diesel Subsidy Scheme",
        type: "Subsidy",
        state: "Bihar",
        central: false,
        eligibility: {
            farmerType: ["Small", "Marginal", "Large", "All"],
        },
        benefits: "Subsidy on diesel for irrigation purposes during drought-like situations.",
        applyLink: "https://dbtagriculture.bihar.gov.in/",
        description: "Provides subsidy to farmers for diesel used in pump sets for irrigation.",
        docsRequired: ["Diesel Purchase Receipt", "Aadhaar", "Bank Details", "LPC"]
    }
];
