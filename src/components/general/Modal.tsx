import { Modal as ModalComponent, ModalBody } from 'reactstrap';

function Modal({ modal, toggle, handleDelete, setSelectedCar }) {
    return (
        <>
            <ModalComponent centered={true} isOpen={modal} toggle={toggle} fade={true} onClosed={() => setSelectedCar(null)}>
                <ModalBody className='text-center'>
                    <img src="/images/delete-car.png" alt="" />
                    <h1 className="modal-title fw-bold fs-5">Menghapus Data Mobil</h1>
                    <p>
                        Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin menghapus?
                    </p>
                    <div className="d-flex flex-row gap-3 justify-content-center">
                        <button type="button" className="col-4 btn btn-primary"
                            onClick={handleDelete}>
                            Ya
                        </button>
                        <button type="button" className="col-4 btn btn-outline-primary"
                            onClick={toggle}>
                            Tidak
                        </button>
                    </div>
                </ModalBody>
            </ModalComponent>
        </>
    );
}

export default Modal;