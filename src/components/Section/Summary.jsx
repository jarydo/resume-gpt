import { Section } from "./Section";

export const Summary = ({ summary }) => {
    return (
        <Section title={"SUMMARY OF QUALIFICATIONS"}>
            <div>{summary.toString()}</div>
        </Section>
    );
}