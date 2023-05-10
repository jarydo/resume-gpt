import { Section } from "./Section";

export const Skills = ({ skills }) => {
    return (
        <Section title={"SKILLS"}>
            <div className="flex justify-between">
                {Object.keys(skills).map((category) => {
                    return (
                        <div>
                            <b>{category}</b>
                            <div>{skills[category].toString()}</div>
                        </div>
                    );
                })}
            </div>
            
        </Section>
    );
}