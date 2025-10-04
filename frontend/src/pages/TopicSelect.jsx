import React from "react";
import { useState } from "react";

const TOPICS = [
    { id: "anatomy", name: "Anatomy" },
    { id: "anesthesiology", name: "Anesthesiology" },
    { id: "artificial-intelligence", name: "Artificial Intelligence" },
    { id: "biochemistry", name: "Biochemistry" },
    { id: "bioengineering", name: "Bioengineering" },
    { id: "biomedical-engineering", name: "Biomedical Engineering" },
    { id: "biophysics", name: "Biophysics" },
    { id: "biostatistics", name: "Biostatistics" },
    { id: "cardiology", name: "Cardiology" },
    { id: "chemical-engineering", name: "Chemical Engineering" },
    { id: "chemistry", name: "Chemistry" },
    { id: "civil-engineering", name: "Civil Engineering" },
    { id: "clinical-pharmacology", name: "Clinical Pharmacology" },
    { id: "cloud-computing", name: "Cloud Computing" },
    { id: "communication-systems", name: "Communication Systems" },
    { id: "compiler-design", name: "Compiler Design" },
    { id: "computer-architecture", name: "Computer Architecture" },
    { id: "computer-graphics", name: "Computer Graphics" },
    { id: "computer-networks", name: "Computer Networks" },
    { id: "computer-organization", name: "Computer Organization" },
    { id: "control-systems", name: "Control Systems" },
    { id: "cybersecurity", name: "Cybersecurity" },
    { id: "data-mining", name: "Data Mining" },
    { id: "data-structures", name: "Data Structures" },
    { id: "database-systems", name: "Database Systems" },
    { id: "dermatology", name: "Dermatology" },
    { id: "diagnostic-imaging", name: "Diagnostic Imaging" },
    { id: "digital-electronics", name: "Digital Electronics" },
    { id: "distributed-systems", name: "Distributed Systems" },
    { id: "ecg", name: "Electrocardiography (ECG)" },
    { id: "electrical-engineering", name: "Electrical Engineering" },
    { id: "electromagnetics", name: "Electromagnetics" },
    { id: "embedded-systems", name: "Embedded Systems" },
    { id: "endocrinology", name: "Endocrinology" },
    { id: "environmental-engineering", name: "Environmental Engineering" },
    { id: "epidemiology", name: "Epidemiology" },
    { id: "fluid-mechanics", name: "Fluid Mechanics" },
    { id: "gastroenterology", name: "Gastroenterology" },
    { id: "general-medicine", name: "General Medicine" },
    { id: "genetics", name: "Genetics" },
    { id: "geotechnical-engineering", name: "Geotechnical Engineering" },
    { id: "gynecology", name: "Gynecology" },
    { id: "heat-transfer", name: "Heat Transfer" },
    { id: "hematology", name: "Hematology" },
    { id: "human-anatomy", name: "Human Anatomy" },
    { id: "immunology", name: "Immunology" },
    { id: "industrial-engineering", name: "Industrial Engineering" },
    { id: "information-retrieval", name: "Information Retrieval" },
    { id: "information-security", name: "Information Security" },
    { id: "internal-medicine", name: "Internal Medicine" },
    { id: "machine-learning", name: "Machine Learning" },
    { id: "manufacturing-processes", name: "Manufacturing Processes" },
    { id: "materials-science", name: "Materials Science" },
    { id: "mathematics", name: "Mathematics" },
    { id: "mechanical-engineering", name: "Mechanical Engineering" },
    { id: "medical-biochemistry", name: "Medical Biochemistry" },
    { id: "medical-ethics", name: "Medical Ethics" },
    { id: "medical-genetics", name: "Medical Genetics" },
    { id: "medical-microbiology", name: "Medical Microbiology" },
    { id: "medical-physics", name: "Medical Physics" },
    { id: "medical-terminology", name: "Medical Terminology" },
    { id: "microbiology", name: "Microbiology" },
    { id: "mobile-computing", name: "Mobile Computing" },
    { id: "molecular-biology", name: "Molecular Biology" },
    { id: "nephrology", name: "Nephrology" },
    { id: "neurology", name: "Neurology" },
    { id: "neurosurgery", name: "Neurosurgery" },
    { id: "numerical-methods", name: "Numerical Methods" },
    { id: "obstetrics", name: "Obstetrics" },
    { id: "oncology", name: "Oncology" },
    { id: "operating-systems", name: "Operating Systems" },
    { id: "ophthalmology", name: "Ophthalmology" },
    { id: "orthopedics", name: "Orthopedics" },
    { id: "otolaryngology", name: "Otolaryngology (ENT)" },
    { id: "pathology", name: "Pathology" },
    { id: "pediatrics", name: "Pediatrics" },
    { id: "pharmacology", name: "Pharmacology" },
    { id: "physical-chemistry", name: "Physical Chemistry" },
    { id: "physiology", name: "Physiology" },
    { id: "plastic-surgery", name: "Plastic Surgery" },
    { id: "power-systems", name: "Power Systems" },
    { id: "probability", name: "Probability" },
    { id: "programming-languages", name: "Programming Languages" },
    { id: "psychiatry", name: "Psychiatry" },
    { id: "pulmonology", name: "Pulmonology" },
    { id: "radiology", name: "Radiology" },
    { id: "robotics", name: "Robotics" },
    { id: "signal-processing", name: "Signal Processing" },
    { id: "software-engineering", name: "Software Engineering" },
    { id: "solid-mechanics", name: "Solid Mechanics" },
    { id: "structural-analysis", name: "Structural Analysis" },
    { id: "structural-engineering", name: "Structural Engineering" },
    { id: "surgery", name: "Surgery" },
    { id: "thermodynamics", name: "Thermodynamics" },
    { id: "toxicology", name: "Toxicology" },
    { id: "transfusion-medicine", name: "Transfusion Medicine" },
    { id: "transportation-engineering", name: "Transportation Engineering" },
    { id: "urology", name: "Urology" },
    { id: "virology", name: "Virology" },
    { id: "web-development", name: "Web Development" }
];

export default function TopicSelect({ onChoose }) {
    const [customTopic, setCustomTopic] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCustomTopic = async (e) => {
        e.preventDefault();
        if (!customTopic.trim()) return;
        setLoading(true);
        // You can call your AI API here to validate or generate the topic if needed
        // For now, just pass the custom topic as an id
        onChoose(customTopic.trim());
        setLoading(false);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-4 dark:text-white">
                Choose a topic
            </h1>
            <form
                className="mt-8 flex flex-col sm:flex-row items-stretch gap-3"
                onSubmit={handleCustomTopic}
            >
                <input
                    type="text"
                    className="flex-1 p-3 border rounded-xl dark:bg-gray-900 dark:text-white"
                    placeholder="Or enter a new topic (e.g. Quantum Computing)"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-300 transition"
                    disabled={loading}
                >
                    {loading ? "Generating..." : "Generate"}
                </button>
            </form>
            <div className="grid grid-cols-2 gap-4">
                {TOPICS.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => onChoose(t.id)}
                        className="p-6 border rounded-2xl bg-white dark:bg-gray-800 text-blue-600 dark:text-yellow-300 text-left hover:scale-105 transition-transform shadow-sm"
                    >
                        <h2 className="text-lg font-semibold">{t.name}</h2>
                        <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
                            Generate a 5-question quiz on {t.name}
                        </p>
                    </button>
                ))}
            </div>
            
        </div>
    );
}
