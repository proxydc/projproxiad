import urldc from "../_helpers/urllist.js";
import axios from "axios";

class FormData {
    static save(id, dc, document, status) {
        try {
            let generatedDocumentObj = this.getDocumentObject(dc, document);
            this.updateDC(id, generatedDocumentObj, status);
        } catch (err) {
            throw err;
        }

    }

    static async updateDC(id, generatedDoc, status) {
        try {
            const url = urldc.getDcUrl(id);
            let result = await axios.put(url, {
                dc_status: status,
                document: generatedDoc,
            });
            console.warn(result);
            if (result.status == 201) {
                alert(result.data);
            } else { throw result; }
        } catch (err) {
            throw err;
        }
    }

    static getDocumentObject(dc, document) {

        /* Comp fonctionnelles */
        var domNodes = document.querySelectorAll("#fonct input");
        var nodes = [...domNodes];
        dc.functionalAbilities = nodes.map((x) => x.value).filter(function(i) { return i.trim() != ""; });
        console.log("functional: " + dc.functionalAbilities);

        /* Comp techniques */
        var domNodes = document.querySelectorAll("#techn input");
        var nodes = [...domNodes];
        dc.technicalAbilities = nodes.map((x) => x.value).filter(function(i) { return i.trim() != ""; });
        console.log("technical: " + dc.technicalAbilities);

        /* Diplomes */
        var certifications = [];
        var domNodes = document.querySelectorAll("#certs div.row");
        var nodes = [...domNodes];
        for (let i = 0; i < nodes.length; i++) {
            var year = nodes[i].childNodes[0].childNodes[0].childNodes[0].value;
            var label = nodes[i].childNodes[0].childNodes[1].childNodes[0].value;
            if (year.trim() != "" && label.trim() != "") {
                certifications.push({ year: year, title: label })
            }

        }

        dc.certifications = certifications;

        /* Langues */
        var domNodes = document.querySelectorAll("#langs input");
        var nodes = [...domNodes];
        dc.languages = nodes.map((x) => x.value).filter(function(i) { return i.trim() != ""; });

        console.log("languages: " + dc.languages);

        /* XP */
        var experiencesPro = [];
        var domNodes = document.querySelectorAll("#xps .xp");
        var allNodes = [...domNodes]; // converts a Node list to an array
        var nodes = allNodes.filter(function(i) { return i.id == "" }) // remove ghost template which have ID
            //alert("len: "+ nodes.length);
        for (let i = 0; i < nodes.length; i++) {
            // alert("iam here 1");
            var startValue = nodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[1].value;
            var endValue = nodes[i].childNodes[0].childNodes[0].childNodes[1].childNodes[1].value;
            var titleValue = nodes[i].childNodes[0].childNodes[0].childNodes[2].childNodes[1].value;
            var companyValue = nodes[i].childNodes[0].childNodes[0].childNodes[3].childNodes[1].value;
            var contextValue = nodes[i].childNodes[0].childNodes[1].childNodes[0].childNodes[1].value;
            var technicalenvValue = nodes[i].childNodes[0].childNodes[2].childNodes[1].childNodes[1].value;
            // alert("iam here 11");
            var domtaskNodes = nodes[i].querySelectorAll(".dc-taskinputlist input");
            // alert("iam here 2");
            var alltaskNodes = [...domtaskNodes]; // converts a Node list to an array
            //alert("iam here 3");
            var tasknodes = alltaskNodes.filter(function(i) { return i.id == "" })
                //alert("nodelen: "+ tasknodes.length);
            var taskValues = [];
            for (let t = 0; t < tasknodes.length; t++) {
                //alert("item: "+ tasknodes[t].value);
                if (tasknodes[t].nodeName == "INPUT" && tasknodes[t].value) {
                    taskValues.push(tasknodes[t].value);
                }
            }
            var currentExperience = {
                start: startValue,
                end: endValue,
                title: titleValue,
                company: companyValue,
                context: contextValue,
                technical_env: technicalenvValue,
                tasks: taskValues
            };

            if (currentExperience.start != '') {
                experiencesPro.push(currentExperience)
            }

        }

        dc.experiencesPro = experiencesPro;

        /* Projects perso */
        var personalProjects = [];
        var domNodes = document.querySelectorAll("#projects .project");
        var allNodes = [...domNodes];
        var nodes = allNodes.filter(function(i) { return i.id == "" }) // remove ghost template which have ID

        for (let i = 0; i < nodes.length; i++) {
            //alert("iam here 1 ");
            var periodValue = nodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[1].value;
            //alert("iam here 2 " + periodValue);
            var titleValue = nodes[i].childNodes[0].childNodes[0].childNodes[1].childNodes[1].value;
            // alert("iam here 3 "+ titleValue);
            var contextValue = nodes[i].childNodes[0].childNodes[1].childNodes[0].childNodes[1].value;
            //alert("iam here 4 " + contextValue);
            var technicalenvValue = nodes[i].childNodes[0].childNodes[2].childNodes[1].childNodes[1].value;
            // alert("iam here 5 " + technicalenvValue);

            /*var taskList = nodes[i].childNodes[2].childNodes[0].childNodes[1].childNodes;
            var taskValues = [];
            for (let t = 0; t < taskList.length; t++) {
                if (taskList[t].nodeName == "INPUT" && taskList[t].value) {
                    taskValues.push(taskList[t].value);
                }
            }*/
            var domtaskNodes = nodes[i].querySelectorAll(".dc-taskinputlist-perso input");
            // alert("iam here 2");
            var alltaskNodes = [...domtaskNodes]; // converts a Node list to an array
            //alert("iam here 3");
            var tasknodes = alltaskNodes.filter(function(i) { return i.id == "" })
                // alert("nodelen: "+ tasknodes.length);
            var taskValues = [];
            for (let t = 0; t < tasknodes.length; t++) {
                // alert("item: "+ tasknodes[t].value);
                if (tasknodes[t].nodeName == "INPUT" && tasknodes[t].value) {
                    taskValues.push(tasknodes[t].value);
                }
            }
            var currentProject = {
                period: periodValue,
                title: titleValue,
                context: contextValue,
                technical_env: technicalenvValue,
                tasks: taskValues
            };
            if (currentProject.period != '') {
                personalProjects.push(currentProject)
            }

            console.log("document curr projects values: " + currentProject.period);
        }

        dc.projectsPerso = personalProjects;

        return dc;
    }
}
export default FormData;