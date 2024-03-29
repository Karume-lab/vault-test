import logo from "./logo.svg";
import "./App.css";
import BasicTable from "./components/BasicTable";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

function App() {
  const docs = [{ uri: require("./files/w.jpg"), fileType: "jpg" }];
  return (
    <div className="App">
      <BasicTable />
      <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
    </div>
  );
}

export default App;
