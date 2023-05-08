import React from 'react'
import EventIcon from '@mui/icons-material/Event';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import CreateIcon from '@mui/icons-material/Create';
export const SideBarData = [

    {
        title: "Lister Etudiants",
        icon: <FormatListBulletedIcon />,
        link: '/getalletudiant',
        roles: ['responsable', 'admin', 'enseignant', 'DroitEtud']
    },
    {
        title: "Lister Events",
        icon: <EventIcon />,
        link: '/Events',
        roles: ['responsable', 'admin', 'etudiant', 'Droitevent']
    },
    {
        title: "Créer Event",
        icon: <AddIcon />,
        link: '/newEvent',
        roles: ['responsable', 'admin', 'Droitevent']
    },
    {
        title: "Ajouter Admin",
        icon: <AddIcon />,
        link: '/gestion-acces',
        roles: ['admin']
    },
    {
        title: "Lister Enseignants",
        icon: <FormatListNumberedRtlIcon />,
        link: '/enseignants',
        roles: ['responsable', 'admin', 'DroitEns']
    },
    {
        title: "Voir Status",
        icon: <CheckCircleIcon />,
        link: '/alumnistatus',
        roles: ['alumni']
    },
    {
        title: "Valider Alumni",
        icon: <UnpublishedIcon />,
        link: '/getunverified',
        roles: ['admin', 'DroitEtud']
    },
    {
        title: "Insérer Stage",
        icon: <CreateIcon />,
        link: '/insertstage',
        roles: ['responsable', 'enseignant', 'admin', 'DroitEtud']
    },
    {
        title: "Insérer PFE",
        icon: <CreateIcon />,
        link: '/insertpfe',
        roles: ['responsable', 'enseignant', 'admin', 'DroitEtud']
    },
    {
        title: "Import Excel",
        icon: <AddIcon />,
        link: '/import',
        roles: ['admin', 'DroitExcel']
    },
    {
        title: "Account",
        icon: <CreateIcon />,
        link: '/make-public',
        roles: ['etudiant',]
    },
    {
        title: "Consult Comptes publiques",
        icon: <FormatListNumberedRtlIcon />,
        link: '/publicaccounts',
        roles: ['etudiant',]
    },


]
