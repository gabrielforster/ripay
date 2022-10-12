import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE
} from "baseui/modal"
import { FormControl } from "baseui/form-control"
import { Input } from "baseui/input"
import { useState } from "react"

interface TicketModalProps{
  isOpen: boolean
  closeModal: () => void
}

export default function TicketModal(props: TicketModalProps) {
  
  const [name, setName] = useState<string>()
  const [cpf, setCpf] = useState<string>()
  const [phone, setPhone] = useState<string>()
  const [amount, setAmount] = useState<number>()

  if (!props.isOpen) return <></>

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.closeModal}
        closeable
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
      >
        <ModalHeader>
          Registrar nova venda!
        </ModalHeader>

        <ModalBody>
          <FormControl label="Nome do comprador">
            <Input
              value={name}
              onChange={({target}) => setName(target.value)}
              placeholder="Fulano de Tal"
            />
          </FormControl>

          <FormControl label="CPF">
            <Input
              value={cpf}
              onChange={({target}) => setCpf(target.value)}
              placeholder="000.000.000-00"
            />
          </FormControl>

          <FormControl label="Telefone">
            <Input
              value={phone}
              onChange={({target}) => setPhone(target.value)}
              placeholder="(00) 00000-0000"
            />
          </FormControl>

          <FormControl label="Quantidade">
            <Input
              value={amount}
              onChange={({target}) => setAmount(Number(target.value))}
              placeholder="1"
              type="number"
            />
          </FormControl>

        </ModalBody>
      </Modal>
    </>
  )
}