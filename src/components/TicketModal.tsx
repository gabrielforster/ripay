import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE
} from "baseui/modal"
import { KIND } from "baseui/button"
import { FormControl } from "baseui/form-control"
import { Input } from "baseui/input"
import { PhoneInput, COUNTRIES, SIZE as PHONESIZE } from "baseui/phone-input"
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

  async function handleSubmit(){
    // console.log('name', name, 'cpf', cpf, 'phone', phone, 'amount', amount)

    closeModal()
  }

  function closeModal(){
    setName("")
    setCpf("")
    setPhone("")
    setAmount(0)

    props.closeModal()
  }

  function hasErrorOnCPF(){
    if(!!cpf?.length && cpf?.length !== 11){
      return true
    }
    return false
  }

  function hasErrorOnPhone(){
    if(!!cpf?.length && phone?.length !== 11 ){
      return true
    }
    return false
  }

  if (!props.isOpen) return <></>

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.closeModal}
        closeable
        animate
        autoFocus
        size={SIZE.auto}
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
              error={hasErrorOnCPF()}
              positive={!hasErrorOnCPF() && !!cpf?.length}
              onChange={({target}) => setCpf(target.value)}
              placeholder="000.000.000-00"
            />
          </FormControl>

          <FormControl label="Telefone">
            <PhoneInput
              text={phone}
              error={hasErrorOnPhone()}
              positive={!hasErrorOnPhone() && !!phone?.length}
              onTextChange={({target}) => setPhone(target.value)}
              country={COUNTRIES.BR}
              size={PHONESIZE.mini}
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

        <ModalFooter>
          <ModalButton 
            onClick={closeModal}
            kind={KIND.tertiary}
          >
            Cancelar
          </ModalButton>
          
          <ModalButton
            onClick={() => handleSubmit()}
          >
            Registrar
          </ModalButton>
        </ModalFooter>
      </Modal>
    </>
  )
}
