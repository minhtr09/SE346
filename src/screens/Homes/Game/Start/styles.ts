import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 290,
    height: 420,
  },
  playButton: {
    marginTop: 32,
    width: 120,
    height: 74,
  },
  connectButton: {
    marginTop: 32,

    backgroundColor: "#54cd64",
    flexDirection: "row", // Use 'row' for horizontal arrangement
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 30, // Adjust padding as needed
    paddingVertical: 10, // Adjust padding as needed
    borderWidth: 1,
    borderColor: "#9ae9a5",
    shadowColor: "#35a5af",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    // Set width and height to desired fixed dimensions
    width: 250, // Adjust width as needed
    height: 50, // Adjust height as needed
  },
  monospaceText: {
    fontFamily: "monospace",
    fontWeight: "bold", // System monospace font
    fontSize: 16, // Set your desired font size
    color: "white", // Set your desired text color (optional)
  },
});
