import Bot from "./components/bot";
import "./App.css";
import "./assets/bootstrap/bootstrap.min.css";
function App() {
  const downloadPdf = async () => {
    try {
      const response = await fetch(
        "http://localhost:5050/api/pptDownload/downloadPdf",
        {
          method: "POST",
          // Add any necessary headers or body payload if required
        }
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Create a temporary anchor element
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "example.pdf");
        document.body.appendChild(link);

        // Trigger a click event to initiate download
        link.click();

        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to download PDF:", response.statusText);
        // Handle error appropriately
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Handle error appropriately
    }
  };
  return <button onClick={() => downloadPdf()}>Download</button>;
}

export default App;
