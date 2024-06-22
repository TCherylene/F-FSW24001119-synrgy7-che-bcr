import Accordion from '../general/Accordion';

interface AccordionDataType {
    id: string;
    title: string;
    content: string;
}

export default function Faq() {
    const loremIpsum: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non tempus neque.
    Aenean sed urna at justo interdum rhoncus ut nec tortor. Nullam fringilla, felis a
    luctus condimentum, ipsum turpis faucibus ligula, a tincidunt velit arcu non mi.
    Vivamus semper consectetur ligula, ut vulputate neque tincidunt id.`
    const accordionData: AccordionDataType[] = [
        {
            'id': '1',
            'title': "Apa saja syarat yang dibutuhkan?",
            'content': loremIpsum,
        },
        {
            'id': '2',
            'title': "Berapa hari minimal sewa mobil lepas kunci?",
            'content': loremIpsum,
        },
        {
            'id': '3',
            'title': "Berapa hari sebelumnya sabaiknya booking sewa mobil?",
            'content': loremIpsum,
        },
        {
            'id': '4',
            'title': "Apakah Ada biaya antar-jemput?",
            'content': loremIpsum,
        },
        {
            'id': '5',
            'title': "Bagaimana jika terjadi kecelakaan?",
            'content': loremIpsum,
        },
    ]
    return (
        <>
            <section id="faq" className="my-5">
                <div className="container container-fluid">
                    <div className="row justify-content-between px-3">
                        <div className="col-12 col-lg-5">
                            <h2 className="fw-bolder fs-3">Frequently Asked Question</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        </div>
                        <div className="col-12 col-lg-6">
                            <Accordion data={accordionData} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}