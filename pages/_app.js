import App, { Container } from "next/app";
import Head from "next/head";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import JssProvider from "react-jss/lib/JssProvider";

import Navbar from "../components/Navbar";
import getPageContext from "../lib/getPageContext";

import "../styles/main.scss";

class MyApp extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>NextConnect</title>
        </Head>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider registry={this.pageContext.sheetsRegistry} generateClassName={this.pageContext.generateClassName}>
          <MuiThemeProvider theme={this.pageContext.theme} sheetsManager={this.pageContext.sheetsManager}>
            <CssBaseline />
            <Navbar {...this.props} />
            <Component pageContext={this.pageContext} {...pageProps} />
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}

export default MyApp;
