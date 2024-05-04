export const BASE_URL = "http://" + window.location.hostname + ":5002/api"
export const WS_URL = (id:number) => "ws://" + window.location.hostname + ":5002/ws/cbt/" + id 

export const pathInstallTable = (t:string) => BASE_URL + "/install/table_"+ t;
export const pathInsertNewUser = BASE_URL + "/install/insert_new_user";
export const pathInsertKegiatan = BASE_URL + "/kegiatan/create";
export const pathUpdateKegiatanWithId = BASE_URL + "/kegiatan/update";
export const pathDeleteKegiatan = (id:number) => BASE_URL + "/kegiatan/id/"+ id;
export const pathGetKegiatanNews = BASE_URL + "/kegiatan/terbaru";
export const pathGetKegiatanWithPage = (page:string) => BASE_URL + "/kegiatan/page/"+ page;
export const pathGetKegiatanWithId = (id:number) => BASE_URL + "/kegiatan/id/"+ id;
export const pathCountKegiatan = BASE_URL + "/kegiatan/count";
export const pathAutorizeUser = BASE_URL + "/authorize/login_user";
export const pathAutorizeGuru = BASE_URL + "/authorize/login_guru";

export const pathGetCBTListAll = BASE_URL + "/cbt/list/all";
export const pathListSoalWithKelas = (kelas:string) => BASE_URL + "/cbt/list/kelas/"+ kelas;
export const pathCheckingKode = (id:number) => BASE_URL + "/cbt/list/code/id/"+ id;
export const pathGetResultWithUserId = (id:number) => BASE_URL + "/cbt/result/user/"+ id;
export const pathGetResultWithUserIdAndListId = (id:number, listid:number) => BASE_URL + "/cbt/result/list/"+ listid + "/user/"+ id;
export const pathGetResultWithId = (id:number) => BASE_URL + "/cbt/result/id/"+ id;
export const pathStartCBT = BASE_URL + "/cbt/result/create";
export const pathFinishCBT = BASE_URL + "/cbt/result/update";
export const pathCheckingResult = (iduser:number, idlist:number) => BASE_URL + "/cbt/result/list/"+ idlist + "/user/"+ iduser;
export const pathCheckingResultTime = (iduser:number, idlist:number) => BASE_URL + "/cbt/result/list/"+ idlist + "/user/"+ iduser + "/time";
export const pathGetCBTResultWithListId = (id:number) => BASE_URL + "/cbt/result/list/"+ id;
export const pathGetUserWithKelas = (e:string) => BASE_URL + "/user/kelas/"+ e;
export const pathGetSoalWithIdList = (id:number) => BASE_URL + "/cbt/soal?listid="+ id;
export const pathCountUsers = BASE_URL + "/user/count";
export const pathGetUsersAll = BASE_URL + "/user/all";
export const pathGetUserWithId = (id:number) => BASE_URL + "/user/id/"+id;
export const pathInsertUser = BASE_URL + "/user/create";
export const pathInsertManyUsers = BASE_URL + "/user/createmany";
export const pathGetKelasAll = BASE_URL + "/kelas/all";
export const pathCountKelas = BASE_URL + "/kelas/count";
export const pathInsertKelas = BASE_URL + "/kelas/create";
export const pathDeletekelasWithId = (id:number) => BASE_URL +"/kelas/id/"+id;
export const pathGetGuruAll = BASE_URL + "/guru/all";
export const pathGetGuruWithId = (id:number) => BASE_URL + "/guru/id/"+ id;
export const pathInsertGuru = BASE_URL + "/guru/create";
export const pathUpdateGuru = BASE_URL + "/guru/update";
export const pathDeleteGuru = (id:number) => BASE_URL + "/guru/id/" + id;
export const pathCountGuru = BASE_URL + "/guru/count";
export const pathCBTListAll = BASE_URL + "/cbt/list/all";
export const pathCountCBTList = BASE_URL + "/cbt/list/count";
export const pathChangePriorityCBTList = BASE_URL + "/cbt/list/update_priority";
export const pathInsertCBTList = BASE_URL + "/cbt/list/create";
export const pathGetCBTListWithId =(id:number) => BASE_URL + "/cbt/list/id/"+ id;
export const pathUpdateCBTList = BASE_URL + "/cbt/list/update";
export const pathSwitchAcakCBTList = BASE_URL + "/cbt/list/update_acak";
export const pathChangeCodeCBTList = BASE_URL + "/cbt/list/update_code";
export const pathUpdateStartAndEndCBTList = BASE_URL + "/cbt/list/update_start_end";
export const pathRemoveSoalWithListId = (id:number) => BASE_URL + "/cbt/soal/withlist/id/"+ id;
export const pathRemoveListId = (id:number) => BASE_URL + "/cbt/list/id/"+ id;
export const pathRemoveResultWithListID = (id:number) => BASE_URL + "/cbt/result/withlist/id/"+ id;
export const pathRemoveSoalWithId = (id:number) => BASE_URL + "/cbt/soal/id/"+ id;
export const pathRemoveResultWithId = (id:number) => BASE_URL + "/cbt/result/id/"+ id;
export const pathUpdateResultAnswerWithId = BASE_URL + "/cbt/result/update/withId"
export const pathCreateManySoal = BASE_URL + "/cbt/soal/create_many";

export const pathGetRuangAll = BASE_URL + "/ruang/all";
export const pathCountRuang = BASE_URL + "/ruang/count";
export const pathCreateRuang = BASE_URL + "/ruang/create";
export const pathUpdateRuang = BASE_URL + "/ruang/update";
export const pathDeleteRuang = (id:string) => BASE_URL + "/ruang/id/" + id;

export const pathGetSesiAll = BASE_URL + "/sesi/all";
export const pathCountSesi = BASE_URL + "/sesi/count";
export const pathCreateSesi = BASE_URL + "/sesi/create";
export const pathUpdateSesi = BASE_URL + "/sesi/update";
export const pathDeleteSesi = (id:string) => BASE_URL + "/sesi/id/" + id;

export const pathPrintKehadiran = (mapelid:string, sesi:string, ruang:string, proktor:string, pengawas:string) => BASE_URL + "/pdf/kehadiran/mapel/"+ mapelid + "/sesi/" + sesi + "/ruang/" + ruang + "/?pengawas=" + btoa(pengawas)  + "&proktor=" + btoa(proktor)