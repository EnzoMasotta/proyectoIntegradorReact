import {
  TicketsPlane,
  Car,
  Luggage,
  BedDouble,
  Ticket,
  BriefcaseMedical,
} from "lucide-react";

const navLinks = [
  {
    id: 1,
    name: "Paquetes",
    href: "/paquetes",
    icon: Luggage,
  },
  {
    id: 2,
    name: "Hospedajes",
    href: "/hospedajes",
    icon: BedDouble,
  },
  {
    id: 3,
    name: "Vuelos",
    href: "/vuelos",
    icon: TicketsPlane,
  },
  {
    id: 4,
    name: "Autos",
    href: "/autos",
    icon: Car,
  },
  {
    id: 5,
    name: "Actividades",
    href: "/actividades",
    icon: Ticket,
  },
  {
    id: 5,
    name: "Asistencias",
    href: "/asistencias",
    icon: BriefcaseMedical,
  },
];

export default navLinks;
