import { Section } from "./Section";

export const Education = ({ education }) => {
    return (
        <Section title={"EDUCATION"}>
            <b>{education}</b>
        </Section>
    );
}