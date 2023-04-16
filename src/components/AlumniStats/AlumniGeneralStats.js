import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PersonIcon from '@mui/icons-material/Person';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend ,ResponsiveContainer,Funnel,FunnelChart,LabelList } from 'recharts';
import { getGeneralStats } from "../../api/api";

const data = [
    { promotion: '2023', NombresAlumni: 40 },
    { promotion: '2022', NombresAlumni: 10 },
    { promotion: '2021', NombresAlumni: 630 },
    { promotion: '2020', NombresAlumni: 30 },
    { promotion: '2019', NombresAlumni: 10 },
    { promotion: '2018', NombresAlumni: 210 },
    { promotion: '2017', NombresAlumni: 50 },
  ];


  

function AlumniGeneralStats() {
    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(350);
    const [data, setData] = useState(null);
    const [dataC, setDataC] = useState(null);

    const handleResize = () => {
        if (window.innerWidth <= 450 && window.innerWidth > 300) {
            setWidth(250);
            setHeight(200);
        } else if (window.innerWidth <= 300) {
            setWidth(150);
            setHeight(150);
        } else {
            setWidth(400);
            setHeight(350);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const stats = await getGeneralStats();
            const data = stats.map((stat) => {
                const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
                return {
                  value: stat.etudiant,
                  name: stat.DateObtention,
                  fill: randomColor,
                };
              });
            const datac = stats.map((stat) => {
            return {
                promotion: stat.DateObtention,
                NombresAlumni: stat.etudiant,
            };
            });
            setData(data);
            setDataC(datac);
            console.log(data);
            console.log(datac);
        };
        window.addEventListener("resize", handleResize);
        console.log(data)
        fetchData();
    },[]);


  return (
    <Container>
        <TopPart>
            <SectionTitle>
                Promotions
            </SectionTitle>
            <PromotionCounts>
            { dataC && dataC.map((val) =>
                {
                    return (
                        <CountBox>
                            <Information>
                                <Count>
                                {val.NombresAlumni}
                                </Count>
                                <Title>
                                    Etudiants Alumni
                                </Title>
                                <Year>
                                    Promotion: {val.promotion}
                                </Year>
                            </Information>
                            <Icon>
                                <PersonIcon style={{'font-size':"5rem"}}/>
                            </Icon>
                        </CountBox>
                    )
                }
            )}
            </PromotionCounts>
        </TopPart>
        <BottomPart>
        <SectionTitle>
                Stats In Charts
            </SectionTitle>
            <ChartSection >
                <LineChart  width={width} height={height} data={dataC}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey= "promotion" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="NombresAlumni" stroke="#82ca9d" />
                </LineChart>
                <FunnelChart  width={width} height={height} >
                    <Tooltip />
                    <Funnel
                        dataKey="value"
                        data={data}
                        isAnimationActive
                    >
                        <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                    </Funnel>
                </FunnelChart>
            </ChartSection>
        </BottomPart>
    </Container>
  )
}

export default AlumniGeneralStats;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%; 
  margin-top: 1% ;
  margin-inline: auto;
  border-width: 0.5px;
  height: fit-content;
  border-style: solid;
  border-color: rgb(230, 230, 230);
  -webkit-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
  box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
  border-radius: 15px;
  background-color:rgb(255, 255, 255) ;
  padding: 20px;
  gap:10em;
`
const CountBox = styled.div`
    display: flex;
    width : 23%;
    border-radius: 0.5em;
    background-color: green;
    @media (max-width: 550px) {
        width : 90%;
    }
 
`
const Information = styled.div`
    font-family: 'montserrat';
    width : 100%;
    color: white;
    padding-inline: 1em;
    padding-block: 1.8em;
    @media (max-width: 1310px) {
    text-align: center;
  }

`

const Count = styled.h3`
margin : 0;
font-size: 2rem;
`
const Title = styled.p`
    font-size: 1rem;
`
const Year = styled.p`
    font-size: 0.9rem;
    font-weight: 1000;
    color: black;
    opacity: 0.5;
`
const Icon = styled.div`
    opacity: 0.2;
    color: black;
    display: flex;
    align-items: center;
    @media (max-width: 1310px) {
    display: none;
    }
`

const PromotionCounts=styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 2em;
    flex-wrap: wrap;
    @media (max-width: 550px) {
    flex-direction: column;
    align-content: center;
    }
`

const ChartSection=styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    @media (max-width: 1000px) {
        flex-direction: column;
        gap: 2em;
        align-items: center;
    }
`
const TopPart=styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1em;
    
`
const SectionTitle=styled.h2`
    font-family: 'montserrat';
    color:#4981f5 ;
    font-size: 2rem;
    margin-bottom: 2em;
    text-align: center;
`

const BottomPart=styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height:100%;
`