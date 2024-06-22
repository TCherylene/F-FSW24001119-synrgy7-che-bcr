import { useState } from 'react';
import {
    UncontrolledAccordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from 'reactstrap';

interface AccordionProps {
    data: {
        id: string;
        title: string;
        content: string;
    }[];
}

export default function Accordion({ data }: AccordionProps) {
    const [open, setOpen] = useState('1');
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    }

    return (
        <div>
            <UncontrolledAccordion className="mb-3" defaultOpen={[
                data[0].id,
            ]}
                stayOpen={true}
                toggle={toggle}
            >
                {data.map((item) => (
                    <AccordionItem key={item.id}>
                        <AccordionHeader targetId={item.id}>
                            {item.title}
                        </AccordionHeader>
                        <AccordionBody accordionId={item.id}>
                            {item.content}
                        </AccordionBody>
                    </AccordionItem>
                ))}
            </UncontrolledAccordion>
        </div>
    )
}