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
import { trpc } from "../utils/trpc";


interface SpentModalProps{
  isOpen: boolean;
  closeModal: () => void;
}

export function SpentModal(props: SpentModalProps) {

  const [spentName, setSpentName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [whoSpent, setWhoSpent] = useState<Value>();

  const createSpent = trpc.useMutation("outcome.create-outcome");

  const whoSpentOptions = [
    { label: "Gabriel", id: "gabriel" },
    { label: "Mãe", id: "mae" },
    { label: "Pai", id: "pai" },
  ];

  function getFormatedPayment() {
    if (whoSpent) {
      return whoSpent.map((option) => option.id).toString();
    }
  }

  function handleSubmit(){
    createSpent.mutateAsync({
      description: spentName,
      cost,
      payment: getFormatedPayment() as string,
    });

    handleCloseModal()
  }

  function handleCloseModal(){
    setSpentName("");
    setCost(0);
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
              value={cost}
              onChange={({ target }) => setCost(Number(target.value))}
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
