import React from 'react'
import EventIcon from '@mui/icons-material/Event';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import CreateIcon from '@mui/icons-material/Create';
export  const SideBarData= [

    {
        title :"Lister Etudiants" ,
        icon : <FormatListBulletedIcon/>,
        link: '/getalletudiant',
        roles: ['responsable','admin']
    },
    {
        title :"Lister Events" ,
        icon : <EventIcon/>,
        link: '/Events',
        roles: ['responsable','admin','etudiant']
    },
    {
        title :"Créer Event" ,
        icon : <AddIcon/>,
        link: '/newEvent',
        roles: ['responsable','admin']
    },
    {
        title :"Lister Enseignants" ,
        icon : <FormatListNumberedRtlIcon/>,
        link: '/enseignants',
        roles: ['responsable','admin']
    },
    {
        title :"Voir Status" ,
        icon : <CheckCircleIcon/>,
        link: '/alumnistatus',
        roles: ['etudiant']
    },
    {
        title :"Valider Alumni" ,
        icon : <UnpublishedIcon/>,
        link: '/getunverified',
        roles: ['admin']
    },
    {
        title :"Insérer Stage" ,
        icon : <CreateIcon/>,
        link: '/insertstage',
        roles: ['responsable','enseignant','admin']
    },
    {
        title :"Insérer PFE" ,
        icon : <CreateIcon/>,
        link: '/insertpfe',
        roles: ['responsable','enseignant','admin']
    }

    
]
