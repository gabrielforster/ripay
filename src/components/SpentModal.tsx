import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE as ModalSize,
  ROLE as ModalRole,
} from "baseui/modal";
import { KIND as ButtonKind } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Select, Value } from "baseui/select"
import { useState } from "react";


interface SpentModalProps{
  isOpen: boolean;
  closeModal: () => void;
}

export function SpentModal(props: SpentModalProps) {

  const [spentName, setSpentName] = useState<string>("");
  const [amount, setAmount] = useState<number>();
  const [whoSpent, setWhoSpent] = useState<Value>();


  const whoSpentOptions = [
    { label: "Gabriel", id: "gabriel" },
    { label: "Mãe", id: "mae" },
    { label: "Pai", id: "pai" },
  ];

  function handleSubmit(){
    console.log(spentName, amount, whoSpent)

    handleCloseModal()
  }

  function handleCloseModal(){
    setSpentName("");
    setAmount(undefined);
    setWhoSpent(undefined);
    
    props.closeModal();
  }

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.closeModal}
        closeable
        animate
        autoFocus
        size={ModalSize.default}
        role={ModalRole.dialog}
      >
        <ModalHeader>Cadastrar novo gasto!</ModalHeader>

        <ModalBody>
          <FormControl label="Com o que foi gasto?">
            <Input
              value={spentName}
              onChange={({ target }) => setSpentName(target.value)}
              placeholder="Ex: Boleto tal"
            />
          </FormControl>

          <FormControl label="Quantia">
            <Input
              value={amount}
              onChange={({ target }) => setAmount(Number(target.value))}
              placeholder="Ex: 150.50"
              type="number"
              startEnhancer="$"
            />
          </FormControl>

          <FormControl label="Tirar do saldo de quem?">
            <Select
              options={whoSpentOptions}
              value={whoSpent}
              onChange={({ value }) => setWhoSpent(value)}
              placeholder="Selecione uma opção"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <ModalButton kind={ButtonKind.tertiary} onClick={handleCloseModal}>
            Cancelar
          </ModalButton>
          
          <ModalButton onClick={handleSubmit}>Cadastrar</ModalButton>
        </ModalFooter>
      </Modal>
    </>
  );
}
