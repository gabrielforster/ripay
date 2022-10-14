import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
import { KIND } from "baseui/button";

import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { PhoneInput, COUNTRIES, SIZE as PHONESIZE } from "baseui/phone-input";
import { Select, Value } from "baseui/select";
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox";

import { useState } from "react";

import { trpc } from "../utils/trpc";

interface TicketModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function TicketModal(props: TicketModalProps) {
  const [name, setName] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<Value>();
  const [payed, setPayed] = useState<boolean>(false);
  const [registered, setRegistered] = useState<boolean>(false);

  const paymentOptions = [
    { label: "Gabriel", id: "gabriel" },
    { label: "Mãe", id: "mae" },
    { label: "Pai", id: "pai" },
  ];

  const ticketsMutation = trpc.useMutation("tickets.create-ticket");

  async function createTicket() {
    const createdTicket = await ticketsMutation.mutateAsync({
      name,
      cpf,
      phone,
      amount,
      payment: getFormatedPayment() as string,
      payed,
      registered,
    });

    return createdTicket;
  }

  function getFormatedPayment() {
    if (paymentMethod) {
      return paymentMethod.map((option) => option.id).toString();
    }
  }

  async function handleSubmit() {
    try {
      await createTicket();
    } catch (error) {
      console.error("Error on create ticket", error);
    }

    closeModal();
  }

  function closeModal() {
    setName("");
    setCpf("");
    setPhone("");
    setAmount(0);
    setPaymentMethod(undefined);
    setPayed(false);
    setRegistered(false);

    props.closeModal();
  }

  function hasErrorOnCPF() {
    if (!!cpf?.length && cpf?.length !== 11) {
      return true;
    }
    return false;
  }

  function hasErrorOnPhone() {
    if (!!cpf?.length && phone?.length !== 11) {
      return true;
    }
    return false;
  }

  if (!props.isOpen) return <></>;

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
        <ModalHeader>Cadastrar nova venda!</ModalHeader>

        <ModalBody>
          <FormControl label="Nome do comprador">
            <Input
              value={name}
              onChange={({ target }) => setName(target.value)}
              placeholder="Fulano de Tal"
            />
          </FormControl>

          <FormControl label="CPF">
            <Input
              value={cpf}
              error={hasErrorOnCPF()}
              positive={!hasErrorOnCPF() && !!cpf?.length}
              onChange={({ target }) => setCpf(target.value)}
              placeholder="000.000.000-00"
            />
          </FormControl>

          <FormControl label="Telefone">
            <PhoneInput
              text={phone}
              error={hasErrorOnPhone()}
              positive={!hasErrorOnPhone() && !!phone?.length}
              onTextChange={({ target }) => setPhone(target.value)}
              country={COUNTRIES.BR}
              size={PHONESIZE.mini}
              placeholder="(00) 00000-0000"
            />
          </FormControl>

          <FormControl label="Quantidade">
            <Input
              value={amount}
              onChange={({ target }) => setAmount(Number(target.value))}
              placeholder="1"
              type="number"
            />
          </FormControl>

          <FormControl label="Forma de pagamento">
            <Select
              options={paymentOptions}
              value={paymentMethod}
              onChange={({ value }) => setPaymentMethod(value)}
              labelKey="label"
              valueKey="id"
              placeholder="Selecione a forma de pagamento"
            />
          </FormControl>

          <FormControl label="Mais informações">
            <>
              <Checkbox
                checked={payed}
                onChange={() => setPayed(!payed)}
                labelPlacement={LABEL_PLACEMENT.right}
              >
                Pagamento realizado?
              </Checkbox>

              <Checkbox
                checked={registered}
                onChange={() => setRegistered(!registered)}
                labelPlacement={LABEL_PLACEMENT.right}
              >
                Rifa registrada?
              </Checkbox>
            </>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <ModalButton onClick={closeModal} kind={KIND.tertiary}>
            Cancelar
          </ModalButton>

          <ModalButton onClick={() => handleSubmit()}>Registrar</ModalButton>
        </ModalFooter>
      </Modal>
    </>
  );
}
