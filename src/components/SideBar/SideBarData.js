import React from "react";
import EventIcon from "@mui/icons-material/Event";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddIcon from "@mui/icons-material/Add";
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import CreateIcon from "@mui/icons-material/Create";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ForumIcon from "@mui/icons-material/Forum";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HttpsIcon from "@mui/icons-material/Https";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
export const SideBarData = [
  {
    title: "Lister Etudiants",
    icon: <FormatListBulletedIcon />,
    link: "/getalletudiant",
    roles: ["responsable", "admin", "enseignant", "DroitEtud"],
  },
  {
    title: "Lister Events",
    icon: <EventIcon />,
    link: "/Events",
    roles: ["responsable", "admin", "etudiant", "alumni", "Droitevent"],
  },
  {
    title: "Créer Event",
    icon: <AddIcon />,
    link: "/newEvent",
    roles: ["responsable", "admin", "Droitevent"],
  },
  {
    title: "Voir Status",
    icon: <CheckCircleIcon />,
    link: "/alumnistatus",
    roles: ["alumni", "alumni-unverified", "alumni-refused"],
  },
  {
    title: "Ajouter Admin",
    icon: <AddIcon />,
    link: "/gestion-acces",
    roles: ["admin"],
  },
  {
    title: "Lister Enseignants",
    icon: <FormatListNumberedRtlIcon />,
    link: "/enseignants",
    roles: ["responsable", "admin", "DroitEns"],
  },
  {
    title: "Valider Alumni",
    icon: <UnpublishedIcon />,
    link: "/getunverified",
    roles: ["admin", "DroitEtud"],
  },
  {
    title: "Insérer Stage",
    icon: <CreateIcon />,
    link: "/insertstage",
    roles: ["responsable", "admin", "DroitEtud"],
  },
  ,
  {
    title: "Notification",
    icon: <CreateIcon />,
    link: "/etudiantDashboard",
    roles: ["etudiant"],
  },
  {
    title: "Insérer PFE",
    icon: <CreateIcon />,
    link: "/insertpfe",

    roles: ["responsable", "admin", "DroitEtud"],
  },
  {
    title: "Ajouter Enseignant",
    icon: <CreateIcon />,
    link: "/NewEnseignant",
    roles: ["responsable", "admin", "DroitEns"],
  },

  {
    title: "Voir  Etudiant",
    icon: <FormatListNumberedRtlIcon />,
    link: "/getetudiant",
    roles: ["responsable", "enseignant", "admin", "DroitEtud"],
  },
  {
    title: "Modifier Etudiant",
    icon: <SyncAltIcon />,
    link: "/modifyetudiants",
    roles: ["responsable", "admin", "DroitEtud"],
  },
  {
    title: "Ajouter Etudiant",
    icon: <AddCircleIcon />,
    link: "/ajouteretudiant",
    roles: ["admin", "DroitEtud"],
  },
  {
    title: "Changer Mot De Passe",
    icon: <HttpsIcon />,
    link: "/passreset",
    roles: [
      "responsable",
      "enseignant",
      "admin",
      "etudiant",
      "alumni",
      "alumni-unverified",
      "DroitDemande",
    ],
  },
  {
    title: "Lister Pfe",
    icon: <FormatListNumberedRtlIcon />,
    link: "/getpfe",
    roles: ["admin", "DroitEtud"],
  },
  {
    title: "Mes Pfe",
    icon: <FormatListNumberedRtlIcon />,
    link: "/getpfeenseignant",
    roles: ["enseignant"],
  },
  {
    title: "Pfe Stats",
    icon: <EqualizerIcon />,
    link: "/getpfeStats",
    roles: ["admin", "DroitStats"],
  },
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/enseignantdashboard",
    roles: ["enseignant"],
  },
  {
    title: "Lister Vacations",
    icon: <ListAltIcon />,
    link: "/vacations",
    roles: ["admin"],
  },
  {
    title: "Lister Contrats",
    icon: <ListAltIcon />,
    link: "/contrats",
    roles: ["admin"],
  },
  {
    title: "Demander Vacations",
    icon: <PublishedWithChangesIcon />,
    link: "/demandervacation",
    roles: ["etudiant", "alumni"],
  },
  {
    title: "Demander Contrat",
    icon: <ContactPageIcon />,
    link: "/demandercontratexpert",
    roles: ["etudiant", "alumni"],
  },
  {
    title: "Alumni Stats",
    icon: <EqualizerIcon />,
    link: "/generalstats",
    roles: ["admin", "DroitStats"],
  },
  {
    title: "Publications",
    icon: <ForumIcon />,
    link: "/viewpublications",
    roles: ["etudiant", "alumni"],
  },
  {
    title: "My Publications",
    icon: <ChatBubbleIcon />,
    link: "/mypublications",
    roles: ["etudiant", "alumni"],
  },
  {
    title: "Import Excel",
    icon: <AddIcon />,
    link: "/import",
    roles: ["admin", "DroitExcel"],
  },
  {
    title: "Account",
    icon: <CreateIcon />,
    link: "/make-public",
    roles: ["etudiant"],
  },
  {
    title: "Consult Comptes publiques",
    icon: <FormatListNumberedRtlIcon />,
    link: "/publicaccounts",
    roles: ["etudiant"],
  },
];
