"use strict";

export const script = {
    load: {
        "1.3.6.1.2.1.25.3.3.1.2": {
            max: 100
        },
        "1.3.6.1.4.1.9.9.109.1.1.1.1.6": {
            max: 100
        },
        "1.3.6.1.4.1.37288.1.1.3.1.1": {
            max: 100
        }
    },
    response: {
        "1.3.6.1.4.1.49447.1.1": null
    },
    temperature: {
        "1.3.6.1.4.1.9.9.13.1.3.1.3": {
            name: "1.3.6.1.4.1.9.9.13.1.3.1.2"
        },
        "1.3.6.1.4.1.37288.1.1.5.2.2": {
            unit: 0.1,
            name: "1.3.6.1.4.1.37288.1.1.5.2.1"
        },
        "1.3.6.1.4.1.2636.3.1.13.1.7": {
        }
    },
    memory: {
        "1.3.6.1.2.1.25.2.3.1.6": {
            unit: "1.3.6.1.2.1.25.2.3.1.4",
            where: {
                "1.3.6.1.2.1.25.2.3.1.2": "1.3.6.1.2.1.25.2.1.2"
            },
            max: {
                "1.3.6.1.2.1.25.2.3.1.5": "1.3.6.1.2.1.25.2.3.1.4"
            },
            name: "1.3.6.1.2.1.25.2.3.1.3"
        },
        "1.3.6.1.4.1.9.9.48.1.1.1.5": {
            max: ["1.3.6.1.4.1.9.9.48.1.1.1.5", "1.3.6.1.4.1.9.9.48.1.1.1.6"],
            name: "1.3.6.1.4.1.9.9.48.1.1.1.2"
        }
    },
    storage: {
        "1.3.6.1.2.1.25.2.3.1.6": {
            unit: "1.3.6.1.2.1.25.2.3.1.4",
            where: {
                "1.3.6.1.2.1.25.2.3.1.2": "1.3.6.1.2.1.25.2.1.4"
            },
            max: {
                "1.3.6.1.2.1.25.2.3.1.5": "1.3.6.1.2.1.25.2.3.1.4"
            },
            name: "1.3.6.1.2.1.25.2.3.1.3"
        }
    },
    input: {
        "1.3.6.1.2.1.31.1.1.1.6": {
            unit: 8,
            max: {
                "1.3.6.1.2.1.31.1.1.1.15": 1000000,
                "1.3.6.1.2.1.2.2.1.5": 1
            },
            name: ["1.3.6.1.2.1.31.1.1.1.1", "1.3.6.1.2.1.31.1.1.1.18", "1.3.6.1.2.1.2.2.1.2"]
        },
        "1.3.6.1.2.1.2.2.1.10": {
            unit: 8,
            max: {
                "1.3.6.1.2.1.31.1.1.1.15": 1000000,
                "1.3.6.1.2.1.2.2.1.5": 1
            },
            name: ["1.3.6.1.2.1.31.1.1.1.1", "1.3.6.1.2.1.31.1.1.1.18", "1.3.6.1.2.1.2.2.1.2"]
        }
    },
    output: {
        "1.3.6.1.2.1.31.1.1.1.10": {
            unit: 8,
            max: {
                "1.3.6.1.2.1.31.1.1.1.15": 1000000,
                "1.3.6.1.2.1.2.2.1.5": 1
            },
            name: ["1.3.6.1.2.1.31.1.1.1.1", "1.3.6.1.2.1.31.1.1.1.18", "1.3.6.1.2.1.2.2.1.2"]
        },
        "1.3.6.1.2.1.2.2.1.16": {
            unit: 8,
            max: {
                "1.3.6.1.2.1.31.1.1.1.15": 1000000,
                "1.3.6.1.2.1.2.2.1.5": 1
            },
            name: ["1.3.6.1.2.1.31.1.1.1.1", "1.3.6.1.2.1.31.1.1.1.18", "1.3.6.1.2.1.2.2.1.2"]
        }
    },
    inerror: {
        "1.3.6.1.2.1.2.2.1.14": {
            name: ["1.3.6.1.2.1.31.1.1.1.1", "1.3.6.1.2.1.31.1.1.1.18", "1.3.6.1.2.1.2.2.1.2"]
        }
    },
    outerror: {
        "1.3.6.1.2.1.2.2.1.20": {
            name: ["1.3.6.1.2.1.31.1.1.1.1", "1.3.6.1.2.1.31.1.1.1.18", "1.3.6.1.2.1.2.2.1.2"]
        }
    }
}, match = {
    power: {
        "1.3.6.1.4.1.9.9.13.1.5.1.3": null,
        "1.3.6.1.4.1.2636.3.1.13.1.6.2": null,
        "1.3.6.1.4.1.10188.5.6.1.2.1.3": null,
        "1.3.6.1.4.1.37288.1.1.5.1.2": {
            name: "1.3.6.1.4.1.37288.1.1.5.1.1"
        }
    },
    fan: {
        "1.3.6.1.4.1.9.9.13.1.4.1.3": null,
        "1.3.6.1.4.1.2636.3.1.13.1.6.4": null,
        "1.3.6.1.4.1.10188.5.6.1.3.1.3": null,
        "1.3.6.1.4.1.37288.1.1.5.3.2": {
            name: "1.3.6.1.4.1.37288.1.1.5.3.1"
        }
    }
}, extra = {
    astatus: {
        "1.3.6.1.2.1.2.2.1.7": null
    },
    ostatus: {
        "1.3.6.1.2.1.2.2.1.8": {
            name: ["1.3.6.1.2.1.31.1.1.1.1", "1.3.6.1.2.1.31.1.1.1.18", "1.3.6.1.2.1.2.2.1.2"]
        }
    },
    iftype: {
        "1.3.6.1.2.1.2.2.1.3": null
    },
    ifname: {
        "1.3.6.1.2.1.31.1.1.1.1": null
    },
    ifalias: {
        "1.3.6.1.2.1.31.1.1.1.18": null,
        "1.3.6.1.2.1.2.2.1.2": null
    }
};

export default class Parser {

	//script;
	#templateToindexData = new Map();
    oidToTemplate = new Map();

	constructor () {
        let oidToTemplateData;

        for (let name in match) {
            script[name] = match[name];
        }

        for (let name in extra) {
            script[name] = extra[name];
        }
        
        // script 에 존재하는 template 별로 map 생성
		for (let name in script) {
			this.#templateToindexData.set(name, new Map());

            oidToTemplateData = script[name];

            for (let oid in oidToTemplateData) {
                this.oidToTemplate.set(oid, name);
            }
		}
	}

	update({resource, match, critical}, callback) {
		let option, args;

		for (let [name, indexData] of this.#templateToindexData) {
			isValid: for (let [index, oid] of indexData) {
				option = script[name]?.[oid] ?? {};
                args = {
                    name: name,
                    oid: oid,
                    index: index
                };
                
				args.value = resource[index]?.[oid] ?? null;

				if (args.value === null) {
					break isValid;
				}
				
				if ("where" in option) {
					for (let oid in option.where) {
						if (resource[index]?.[oid] !== option.where[oid]) {
							continue isValid;
						}
					}
				}

				if ("unit" in option) {
                    if (isNaN(option.unit)) {
                        try {
                            args.unit = resource[index][option.unit];
                        } catch (e) {
                            break isValid;
                        }
                    } else {
                        args.unit = option.unit;
                    }
				}

				if ("max" in option) {
					if (isNaN(option.max)) {
						if (Array.isArray(option.max)) {
							try {
								args.max = option.max.reduce((acc, oid) => acc + Number(resource[index][oid]), 0);
							} catch (e) {
								continue isValid;
							}
						} else {
							try {
                                let max = 0, unit;

                                for (let oid in option.max) {
                                    max = resource[index][oid];
                                    unit = option.max[oid];

                                    if (isNaN(unit)) {
                                        unit = resource[index][unit];
                                    }
                                    
                                    max *= unit;
                                    
                                    if (max > 0) {
                                        break;
                                    }
                                }

                                if (max <= 0) {
                                    continue isValid;
                                }

								args.max = max;
							} catch (e) {
								continue isValid;
							}
						}
                    } else {
                        args.max = option.max;
                    }
				}

                if ("name" in option) {
                    if (Array.isArray(option.name)) {
                        const ar = [];

                        option.name.forEach(oid => {
                            const alias = resource[index][oid];
                            
                            if (alias) {
                                ar.push(alias);
                            }
                        });

                        if (ar.length > 0) {
                            ar.sort((a, b) => a.length - b.length);
                        
                            args.alias = ar[0];
                        }
                    } else {
                        args.alias = resource[index][option.name];
                    }
                }
                
                if (match[index]?.[oid] === false) {
                    args.match = false;
                }

                if (critical[index]?.[oid] === false) {
                    args.critical = false;
                }

				callback(args);
			}
		}
	}

	parse (node, callback) {
        const {resource} = node;
		let indexData, templateData;

		for (let index in resource) {
			indexData = resource[index];

            // template 명 내부에 oid가 존재하므로 루프
			for (let name in script) {
				templateData = script[name];

				for (let oid in templateData) {
                    // 관심 있는 oid가 파싱 대상이 있으면 추가
					if (oid in indexData) {
						this.#templateToindexData.get(name).set(index, oid);

						break;
					}
				}
			}
		}

        this.update(node, callback);
	}

    template (oid) {
        switch (this.oidToTemplate.get(oid)) {
            case "ostatus":
                return "인터페이스";
            case "power":
                return "전원";
            case "fan":
                return "팬";
            case "temperature":
                return "온도";
            case "input":
                return "수신";
            case "output":
                return "송신";
            case "storage":
                return "저장공간";
            case "memory":
                return "메모리";
            case "load":
                return "프로세서 로드";
            case "response":
                return "응답속도";
            default:
                return "";
        }
    }

    name (resource, oid, index) {
        const name = script[this.oidToTemplate.get(oid)]?.[oid]?.["name"];

        if (name) {
            if (Array.isArray(name)) {
                const names = [];

                name.forEach(name => {
                    name = resource[index]?.[name];

                    name && names.push(name);
                });

                if (names.length > 0) {
                    return names.reduce((acc, cur) => cur.length < acc.length? cur: acc);
                }
            } else {
                return resource[index]?.[name];
            }
        }
    }
}