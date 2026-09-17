// ---------------------------------------------------------------------------
// Dados mockados da fila de espera. Quando o backend estiver pronto, troque
// por algo como:
//
//   export async function fetchFilaDeEspera() {
//     const res = await fetch("/api/atendimentos");
//     return res.json();
//   }
//
// e substitua o import de MOCK_FILA no componente por um useState + useEffect
// (ou React Query / SWR) que chama essa função.
// ---------------------------------------------------------------------------

// status: "espera" | "marcado" | "atendido" | "cancelado"
// prioridade: "Alta" | "Média" | "Baixa"
// tipo: serviço prestado
export const MOCK_FILA = [
  {
    id: 1,
    nomePaciente: "Maria da Silva Souza",
    status: "espera",
    telefone: "(85) 99123-4567",
    prioridade: "Alta",
    data: "2026-09-22",
    tipo: "Anamnese Psicopedagógica",
    dataEntrada: "2026-08-10",
  },
  {
    id: 2,
    nomePaciente: "João Pedro Alves",
    status: "marcado",
    telefone: "(88) 98877-1122",
    prioridade: "Média",
    data: "2026-09-25",
    tipo: "Anamnese Psicológica",
    dataEntrada: "2026-08-15",
  },
  {
    id: 3,
    nomePaciente: "Ana Beatriz Lima",
    status: "atendido",
    telefone: "(85) 99988-2233",
    prioridade: "Baixa",
    data: "2026-07-15",
    tipo: "Instrumental da Ed. Física",
    dataEntrada: "2026-06-30",
  },
  {
    id: 4,
    nomePaciente: "Carlos Eduardo Rocha",
    status: "cancelado",
    telefone: "(88) 99765-4321",
    prioridade: "Média",
    data: "2026-05-11",
    tipo: "Anamnese Psicopedagógica",
    dataEntrada: "2026-04-20",
  },
  {
    id: 5,
    nomePaciente: "Fernanda Costa Nunes",
    status: "espera",
    telefone: "(85) 99111-2244",
    prioridade: "Alta",
    data: "2026-10-02",
    tipo: "Anamnese Psicológica",
    dataEntrada: "2026-09-05",
  },
  {
    id: 6,
    nomePaciente: "Lucas Gabriel Ferreira",
    status: "espera",
    telefone: "(88) 98123-6655",
    prioridade: "Baixa",
    data: "2026-10-10",
    tipo: "Instrumental da Ed. Física",
    dataEntrada: "2026-09-18",
  },
  {
    id: 7,
    nomePaciente: "Juliana Pereira Dias",
    status: "marcado",
    telefone: "(85) 99456-7788",
    prioridade: "Média",
    data: "2026-09-30",
    tipo: "Anamnese Psicopedagógica",
    dataEntrada: "2026-09-01",
  },
  {
    id: 8,
    nomePaciente: "Rafael Souza Martins",
    status: "atendido",
    telefone: "(88) 99321-9988",
    prioridade: "Alta",
    data: "2026-06-20",
    tipo: "Anamnese Psicológica",
    dataEntrada: "2026-05-28",
  },
];
