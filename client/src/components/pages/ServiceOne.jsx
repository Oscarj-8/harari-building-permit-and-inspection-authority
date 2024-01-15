import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";
import ReusableModal from "../ReusableModal";
import planFile from "../../../public/documents/ፕላን ስምምነት with Header with choosen item.docx";

export default function ServiceOne() {
  const fileRef = useRef(null);
  const scannedImagesRef = useRef(null);
  const [documentFile, setDocumentFile] = useState(undefined);
  const [scannedImages, setScannedImages] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [submitLoader, setSubmitLoader] = useState(false);

  console.log(scannedImages);
  console.log(documentFile);

  const handleImport = async () => {
    setSubmitLoader(true);
    if (documentFile && scannedImages) {
      const formData = new FormData();
      formData.append("file", documentFile);

      for (let i = 0; i < scannedImages.length; i++) {
        formData.append("scannedImages", scannedImages[i]);
      }
      console.log(formData);
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("File uploaded successfully");
          setOpen(true);
          setDocumentFile(null);
          setScannedImages(null);
          setSubmitLoader(false);
        } else {
          console.error("File upload failed");
        }
      } catch (error) {
        console.error("An error occurred", error);
      }
    }
  };

  const handleInfoOpenClose = () => setInfoOpen(false);

  return (
    <div className="flex items-center justify-center text-black p-4">
      <main className="flex flex-col gap-8 max-w-7xl">
        <div className=" text-lg ">
          <h1 className="text-center font-bold text-2xl my-7">
            Welcome to Plan Consent service page
          </h1>
          <p className="text-start">
            Welcome to our Planning Consent Request Service! We understand that
            obtaining planning consent is a crucial step in your project, and
            we&apos;re here to make the process as seamless as possible. To
            initiate your planning consent request, follow the step-by-step
            guide below. Please ensure you have all necessary information and
            documents ready before proceeding. If you encounter any difficulties
            or have questions, feel free to reach out to our support team for
            assistance.
          </p>
          <p>
            ለይዞታ ማጣት እና ፕላን ስምም ነት ማሟላት የሚባቸው ማስረጃዎችን ለማየት{" "}
            <Button
              variant="contained"
              className="bg-blue-700"
              onClick={() => setInfoOpen(true)}
            >
              Click here
            </Button>
          </p>
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl text-start w-full font-semibold underline">
              Steps:
            </h2>
            <div className=" flex flex-col  gap-6">
              <div>
                <h3 className="font-medium text-black">
                  1. Download the Document File:
                </h3>
                <li>
                  Click on the &quot;Download&quot; button to download the
                  document file that needs to be filled. The file is named
                  &quot;AblazeLabsCV.docx.&quot;
                </li>
              </div>
              <div>
                <h3 className="font-medium text-black">
                  2. Fill the Document File:
                </h3>
                <li>
                  Open the downloaded document file using a compatible word
                  processing software (such as Microsoft Word or Google Docs).
                </li>
                <li>
                  Fill in the required fields with accurate and complete
                  information related to your planning consent request.
                </li>
                <li>
                  Make sure to follow any specific instructions or guidelines
                  provided within the document to ensure accurate submission.
                </li>
              </div>
              <div>
                <h3 className="font-medium text-black">
                  3. Attach Scanned Images:
                </h3>
                <li>
                  If required, attach scanned images of your national ID and any
                  other related pieces of information as specified in the
                  document.
                </li>
                <li>
                  Ensure that the scanned images are clear, legible, and meet
                  any specified format or resolution requirements.
                </li>
              </div>
              <div>
                <h3 className="font-medium text-black">
                  4. Save the Document File:
                </h3>
                <li>
                  Save the filled document file with a new name to preserve your
                  original downloaded file.
                </li>
                <li>
                  It&apos;s recommended to save the file in a location on your
                  computer where you can easily locate it for the next steps.
                </li>
              </div>
              <div>
                <h3 className="font-medium text-black">
                  5. Import the Filled Document File:
                </h3>
                <li>
                  Click on the &quot;Import&quot; button on the service page.
                </li>
                <li>
                  Locate and select the filled and saved document file from your
                  computer when prompted. This action will associate the file
                  with the upload functionality.
                </li>
              </div>
              <div>
                <h3 className="font-medium text-black">
                  6. Upload the Document File:
                </h3>
                <li>
                  Click on the &quot;Submit&quot; button to initiate the file
                  upload process.
                </li>
              </div>
              <div>
                <h3 className="font-medium text-black">7. Wait for Review:</h3>
                <li>
                  After successfully uploading the document file, wait for the
                  review process to be completed.
                </li>
                <li>
                  We will assess the submitted information and document file to
                  determine planning consent eligibility.
                </li>
              </div>
              <div>
                <h3 className="font-medium text-black">
                  8. Confirmation and Contact:
                </h3>
                <li>
                  If the submission is successful, you will see a confirmation
                  message on the screen indicating that the file has been
                  uploaded successfully.
                </li>
                <li>
                  Expect to be contacted by us within a few days regarding the
                  status of your planning consent request.
                </li>
              </div>
            </div>
            <p>
              <span className="font-bold">Note:</span> Ensure that you have a
              stable internet connection during the download, filling, and
              upload processes. Additionally, carefully review all instructions
              within the document file to avoid any errors in the submission. If
              you encounter any issues, refer to the provided contact
              information for assistance.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap w-full items-center justify-center gap-8 pb-12">
          <div>
            <Button variant="contained" className="w-[300px] bg-blue-700">
              <a
                download="ፕላን ስምምነት with Header with choosen item.docx"
                href={planFile}
              >
                Download file
              </a>
            </Button>
          </div>
          <div id="scannedImages" className="">
            <input
              type="file"
              ref={scannedImagesRef}
              id="file"
              className="hidden"
              multiple
              onChange={(e) => setScannedImages(e.target.files)}
            />
            <Button
              variant="contained"
              onClick={() => scannedImagesRef.current.click()}
              className="bg-blue-700 w-[300px]"
            >
              import Scanned images
            </Button>
          </div>
          <div id="docFile" className="">
            <input
              type="file"
              ref={fileRef}
              id="file"
              className="hidden"
              onChange={(e) => setDocumentFile(e.target.files[0])}
            />
            <Button
              variant="contained"
              onClick={() => fileRef.current.click()}
              className="bg-blue-700 w-[300px]"
            >
              import the file
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              onClick={handleImport}
              className="bg-blue-700 w-[300px]"
              disabled={!documentFile || !scannedImages}
            >
              {submitLoader ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </main>
      <ReusableModal open={open} onClose={handleClose}>
        <div className="flex flex-col items-center">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirmation
          </Typography>
          <Typography
            className="text-green-700 text-center"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            You have successfully uploaded and sent the request, we will get in
            touch with in a few days
          </Typography>
          <Button
            variant="contained"
            className="w-full bg-blue-700 mt-6"
            onClick={handleClose}
          >
            Ok
          </Button>
        </div>
      </ReusableModal>
      <ReusableModal open={infoOpen} onClose={handleClose}>
        <div className="flex flex-col min-w-[335px] items-center lg:w-[1000px] xl:w-[1280px] 2xl:w-[1400px] ">
          <Typography
            id="modal-modal-title"
            className="mb-8  text-3xl"
            variant="h5"
          >
            ለይዞታ ማጣት እና ፕላን ስምም ነት ማሟላት የሚባቸው ማስረጃዎች
          </Typography>
          <div className="flex flex-col gap-4 overflow-y-auto h-[400px] lg:flex-row">
            <div>
              <h2 className="text-2xl font-semibold l text-slate-700">
                ለኢንቨስትመንት
              </h2>
              <ul className="list-disc px-4 text-lg">
                <li>ከመሬት ልማት ማኔጅመንት ባለስልጣን ከእዳና እገዳ ነፃ (ክሊራንስ)</li>
                <li>የኢንቨስትመነት ፍቃድና ፕሮፖዛል</li>
                <li>ከክልሉ ካቢኔ የፀደቀበት ቃለ-ጉባዬ (አዲስ መሬት ሲሆን)</li>
                <li>ካርታ እና የመሬት ልማት ቃለ-ጉባዬ (በራሱ ይዞታ ላይ ለሚያለማ)</li>
                <li>የሊዝ ክፍያ ሪሲት ኮፒ</li>
                <li>ግብር ሪሲት ኮፒ</li>
                <li>የማንነት መታወቂያ ኮፒ</li>
                <li>ውክልና ኮፒ(ባለቤቱ ካልሆነ)</li>
                <li>-አካባቢ ተፅኖ ጥናት (E.IA)</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold l text-slate-700">
                ለግል ቤት
              </h2>
              <ul className="list-disc px-4 text-lg">
                <li>ከመሬት ልማት ማኔጅመንት ባለሥልጣን ከእዳና እገዳ ነፃ (ኪሊራንስ)</li>
                <li>ካርታ ፎቶ ኮፒ</li>
                <li>ግብር ሪሲት ኮፒ</li>
                <li>የማንነት መታወቂያ ኮፒ</li>
                <li>ውክልና ኮፒ( ባለቤቱ ካልሆነ)</li>
                <li>ግብር ሪሲት ኮፒ</li>
                <li>የማንነት መታወቂያ ኮፒ</li>
                <li>ጀጎል ከሆነ(የቅርስ ጥበቃ ደብዳቤ )</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold l text-slate-700">
                ለቀበሌ ቤት
              </h2>
              <ul className="list-disc px-4 text-lg">
                <li>ከሚኖሩበት ወረዳ ደብዳቤ</li>
                <li>ቤት ኪራይ ከደብዳቤው ስም ጋር አንድ አይነት ኮፒ</li>
                <li>የማንነት መታወቂያ ኮፒ</li>
                <li>ውክልና ኮፒ(ባለቤቱ ካልሆነ)</li>
                <li>ጀጎል ከሆነ(የቅርስ ጥበቃ ደብዳቤ )</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold l text-slate-700">
                ኪራይ ቤቶች
              </h2>
              <ul className="list-disc px-4 text-lg">
                <li>ከኪራይ ቤቶች ደብዳቤ</li>
                <li>የቤት ኪራይ ሪሲት ኮፒ</li>
                <li>ውል ኮፒ</li>
                <li>የማንነት የሚገልፅ መታወቂያ</li>
              </ul>
            </div>
          </div>

          <Button
            variant="contained"
            className="w-[100px] bg-blue-700 mt-6"
            onClick={handleInfoOpenClose}
          >
            Ok
          </Button>
        </div>
      </ReusableModal>
    </div>
  );
}
