import { Section } from "./Section";

export const Experience = ({ experience }) => {
    return (
        <Section title={"WORK EXPERIENCE"}>
            {Object.keys(experience).map((company) => {
                return (
                    <div>
                        <b>{company}</b>
                        <ul className="list-disc ml-4">
                            {experience[company].map((bullet) => {
                                return <li>{bullet}</li>
                            })}
                        </ul>
                    </div>
                );
            })}
        </Section>
    );
}