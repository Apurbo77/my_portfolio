// Portfolio Data Configuration
const portfolioData = {
    creditsCompleted: 93,
    cgpa: 3.51,
    expectedGraduation: 2027,
    personalInfo: {
        name: "Apurbo Kumar Bhaket",
        title: "CSE Student at BRAC University",
        email: "apurbobhaket17@gmail.com",
        phone: "+8801760202953",
        location: "Dhaka, Bangladesh",
        facebook: "https://www.facebook.com/apurbo.bhaket.9/",
        github: "https://github.com/Apurbo77"
    },
    education: [
        {
            degree: "Bachelor of Science",
            department: "Department of Computer Science and Engineering",
            university: "BRAC University",
            universityUrl: "https://www.bracu.ac.bd/",
            expectedYear: 2027
        },
        {
            degree: "Higher Secondary Certificate",
            group: "Science",
            result: "5.00 out of 5.00",
            board: "Rajshahi",
            passingYear: 2021
        },
        {
            degree: "Secondary School Certificate",
            group: "Science",
            result: "5.00 out of 5.00",
            board: "Rajshahi",
            passingYear: 2019
        }
    ],
    skills: {
        technical: ["Python", "C Language", "Laravel Framework", "MS Word", "PowerPoint"],
        soft: ["Robotics Club (HR)", "Event Planning", "Teamwork", "Leadership", "Communication"],
        languages: ["Bengali", "English", "Hindi"]
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioData;
}