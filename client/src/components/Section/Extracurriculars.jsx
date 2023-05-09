import { Section } from "./Section";

export const Extracurriculars = ({ extracurriculars }) => {
    return (
        <Section title={"EXTRACURRICULARS"}>
            {Object.keys(extracurriculars).map((activity) => {
                return (
                    <div>
                        <b>{activity}</b>
                        <ul className="list-disc ml-4">
                            {extracurriculars[activity].map((bullet) => {
                                return <li>{bullet}</li>
                            })}
                        </ul>
                    </div>
                );
            })}
        </Section>
    );
}