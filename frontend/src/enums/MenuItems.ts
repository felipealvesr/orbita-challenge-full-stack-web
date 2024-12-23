export interface MenuItem {
  label: string;
  icon: string;
  route: string; 
}

export const MenuItems: MenuItem[] = [
  { label: "Alunos", icon: "mdi-account-school", route: "/student-select" },
  { label: "Cursos", icon: "mdi-book-education", route: "/" },
  { label: "Professores", icon: "mdi-account-tie", route: "/" },
  { label: "Turmas", icon: "mdi-school", route: "/" },
  { label: "Disciplinas", icon: "mdi-book-open-page-variant", route: "/" },
  { label: "Notas e Frequência", icon: "mdi-file-chart", route: "/" },
  { label: "Matrículas", icon: "mdi-account-plus", route: "/" },
  { label: "Financeiro", icon: "mdi-cash-multiple", route: "/" },
  { label: "Relatórios", icon: "mdi-file-document-multiple", route: "/" },
  { label: "Configurações", icon: "mdi-cog", route: "/" },
];
