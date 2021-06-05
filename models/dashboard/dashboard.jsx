// my-dashboard-component.jsx
import React, {useEffect, useState} from 'react';
import { ApiClient } from 'admin-bro'
import { ThemeProvider } from 'styled-components'
import {Button, theme, Box, Header, Text, Icon, Link} from '@admin-bro/design-system'
import { Section } from '@admin-bro/design-system'
import { CurrentUserNav } from '@admin-bro/design-system'
import { Illustration } from '@admin-bro/design-system'
import {
    DropDown,
    DropDownTrigger,
    DropDownMenu,
    DropDownItem
} from '@admin-bro/design-system'


const api = new ApiClient()
const name = 'FaunaFication - Master Admin'



const Dashboard = () => {
    const [data, setData] = useState({})
    useEffect(() => {
        api.getDashboard().then((response) => {
            setData(response.data)
        })
    }, [])
    return (
      <ThemeProvider theme={theme}>
          <Box variant="grey">
              <Box bg="successDark" flex flexDirection="row">
                  <Box flexGrow={1} paddingTop={50} width={1/3}>
                      <Illustration variant={"GithubLogo"} width={500} height={200}/>
                  </Box>
                  <Box width={1/3}>
                      <Header.H2 paddingTop={100}>Welcome To FaunaFication!</Header.H2>
                  </Box>
                  <Box flexShrink={0} width={1/3}>
                      <Illustration variant={"SlackLogo"} width={500} height={150}/>
                  </Box>
              </Box>
              <Section>
                  <Box flex flexDirection="row" >
                      <Box flexGrow={1} variant="grey" p="md" width={1/2} marginRight={10} boxShadow="cardHover">
                          <Box alignContent='center'>
                              <Illustration variant={"Folders"} width={500}/>
                          </Box>
                          <Box>
                              <Header.H6>
                                  The impact of this event has worsened the outlook for struggling species with some researchers believing it has brought some species to extinction.
                                  With this event being so recent there is not enough up to date data to verify the true effect on the local flora and fauna yet many researchers claim the current figures are conservative at best.
                                  Since the majority of data publicly available is not current we are displaying data before the 2019/2020 Bushfires and thus in future there may be a major changes.
                              </Header.H6>
                          </Box>
                      </Box>
                      <Box flexShrink={0} variant="grey" p="md" width={1/2} boxShadow="cardHover">
                          <Box>
                              <Illustration variant={"DocumentCheck"} width={500}/>
                          </Box>
                          <Box>
                              <Header.H6>
                                  The impact of this event has worsened the outlook for struggling species with some researchers believing it has brought some species to extinction.
                                  With this event being so recent there is not enough up to date data to verify the true effect on the local flora and fauna yet many researchers claim the current figures are conservative at best.
                                  Since the majority of data publicly available is not current we are displaying data before the 2019/2020 Bushfires and thus in future there may be a major changes.
                              </Header.H6>
                          </Box>
                      </Box>
                  </Box>
              </Section>
              <Section>
                  <Box variant="grey">
                      <Box variant="white" flex flexDirection="row">
                          <Box flexGrow={1}>
                              <Header.H3>Mongoose</Header.H3>
                          </Box>
                          <Box flexShrink={0}>
                              <DropDown>
                                  <DropDownTrigger>
                                      <Button>
                                          <Icon icon="Archive" />
                                          GeoData
                                      </Button>
                                  </DropDownTrigger>
                                  <DropDownMenu>
                                      <DropDownItem>
                                          <Link href="http://localhost:3000/admin/resources/speciesInfo">
                                              <Icon icon="DataBase"/>
                                              Species Information
                                          </Link>
                                      </DropDownItem>
                                      <DropDownItem>
                                          <Link href="http://localhost:3000/admin/resources/donatedPeople">
                                              <Icon icon="DataBase" />
                                              Donated Person
                                          </Link>
                                      </DropDownItem>
                                      <DropDownItem>
                                          <Link href="http://localhost:3000/admin/resources/charities">
                                              <Icon icon="DataBase" />
                                              Charities
                                          </Link>
                                      </DropDownItem>
                                  </DropDownMenu>
                              </DropDown>
                          </Box>
                      </Box>
                  </Box>
              </Section>
              {/*<Section>
                  <Box flex flexDirection="column">
                      <Box width={[1, 1/2, 1/3]}>Sidebar</Box>
                      <Box width={[1, 1/2, 2/3]}>Content</Box>
                  </Box>
              </Section>*/}
          </Box>
          <CurrentUserNav name={name}/>
      </ThemeProvider>
    )
}

export default Dashboard
