// Sample Lead Data for Testing
// You can use this data to quickly test the application

const sampleLeads = [
  {
    fullName: "John Smith",
    phoneNumber: "+1 555-0101",
    email: "john.smith@techcorp.com",
    companyName: "TechCorp Solutions",
    requirement: "Looking for a complete ERP system implementation. Budget: $50k-100k. Timeline: 3-6 months.",
    status: "Meeting"
  },
  {
    fullName: "Sarah Johnson",
    phoneNumber: "+1 555-0102",
    email: "sarah.j@innovate.io",
    companyName: "Innovate Inc",
    requirement: "Need mobile app development for iOS and Android. E-commerce platform.",
    status: "Followed Up"
  },
  {
    fullName: "Michael Chen",
    phoneNumber: "+1 555-0103",
    email: "m.chen@dataflow.com",
    companyName: "DataFlow Systems",
    requirement: "Cloud infrastructure migration to AWS. Currently on-premise.",
    status: "Contacted"
  },
  {
    fullName: "Emily Rodriguez",
    phoneNumber: "+1 555-0104",
    email: "emily.r@marketpro.com",
    companyName: "MarketPro Agency",
    requirement: "Website redesign and SEO optimization. Looking for full-service digital marketing.",
    status: "Done"
  },
  {
    fullName: "David Park",
    phoneNumber: "+1 555-0105",
    email: "david@startupxyz.com",
    companyName: "StartupXYZ",
    requirement: "MVP development for SaaS product. Need React + Node.js developers.",
    status: "On Hold"
  },
  {
    fullName: "Lisa Anderson",
    phoneNumber: "+1 555-0106",
    email: "l.anderson@globaltech.com",
    companyName: "Global Tech Partners",
    requirement: "Cybersecurity audit and penetration testing for enterprise application.",
    status: "Contacted"
  },
  {
    fullName: "Robert Taylor",
    phoneNumber: "+1 555-0107",
    email: "robert.t@financeco.com",
    companyName: "FinanceCo",
    requirement: "Custom CRM development with Salesforce integration.",
    status: "Followed Up"
  },
  {
    fullName: "Jennifer Lee",
    phoneNumber: "+1 555-0108",
    email: "jen.lee@healthplus.com",
    companyName: "HealthPlus Medical",
    requirement: "HIPAA-compliant patient management system. Integration with existing EMR.",
    status: "Meeting"
  },
  {
    fullName: "James Wilson",
    phoneNumber: "+1 555-0109",
    email: "james@retailmax.com",
    companyName: "RetailMax",
    requirement: "Point of sale system upgrade and inventory management solution.",
    status: "Dropped"
  },
  {
    fullName: "Maria Garcia",
    phoneNumber: "+1 555-0110",
    email: "maria.g@educenter.org",
    companyName: "EduCenter Online",
    requirement: "Learning management system (LMS) with video streaming capabilities.",
    status: "Contacted"
  }
];

// API Test Commands
console.log("=".repeat(60));
console.log("SAMPLE LEAD DATA");
console.log("=".repeat(60));
console.log("");
console.log("Use these curl commands to quickly add sample leads:");
console.log("");

sampleLeads.forEach((lead, index) => {
  console.log(`# Lead ${index + 1}: ${lead.fullName}`);
  console.log(`curl -X POST http://localhost:5000/api/leads \\`);
  console.log(`  -H "Content-Type: application/json" \\`);
  console.log(`  -d '${JSON.stringify(lead)}'`);
  console.log("");
});

console.log("=".repeat(60));
console.log("OR add them all at once in a Node.js script:");
console.log("=".repeat(60));
console.log("");
console.log("const axios = require('axios');");
console.log("const API_URL = 'http://localhost:5000/api/leads';");
console.log("");
console.log("const sampleLeads = " + JSON.stringify(sampleLeads, null, 2) + ";");
console.log("");
console.log("async function addSampleLeads() {");
console.log("  for (const lead of sampleLeads) {");
console.log("    try {");
console.log("      const response = await axios.post(API_URL, lead);");
console.log("      console.log('✅ Added:', lead.fullName);");
console.log("    } catch (error) {");
console.log("      console.error('❌ Failed:', lead.fullName);");
console.log("    }");
console.log("  }");
console.log("}");
console.log("");
console.log("addSampleLeads();");

module.exports = sampleLeads;
