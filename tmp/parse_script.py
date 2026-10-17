import re
import json

# All raw text pages extracted from the PDF
raw_ocr = """
1. Ikinyabiziga cyose cyangwa ibinyabiziga bigenda bigomba kugira:
(a) Umuyobozi 
b) Umuherekeza
c) A na B ni ibisubizo by’ukuri
d) Nta gisubizo cy’ukuri kirimo

2. Ijambo “akayira” bivuga inzira nyabagendwa ifunganye yagenewe gusa:
a) Abanyamaguru
b) Ibinyabiziga bigendera ku biziga bibiri 
(c) A na B ni ibisubizo by’ukuri
d) Nta gisubizo cy’ukuri kirimo

3. Umurongo uciyemo uduce umenyesha ahegereye umurongo ushobora kuzuzwa n’uturanga gukata tw’ibara ryera utwo turanga cyerekezo tumenyesha : 
a) Igisate cy’umuhanda abayobozi bagomba gukurikira
b) Ahegereye umurongo ukomeje
(c) Igabanurwa ry’umubare w’ibisate by’umuhanda mu cyerekezo bajyamo 
d) A na C nibyo

4. Ahantu ho kugendera mu muhanda herekanwa n’ibimenyetso bimurika ibinyabiziga ntibishobora kuhagenda :
a) Biteganye
b) Ku murongo umwe
c) A na B nibyo
(d) Nta gisubizo cy’ukuri kirimo

5. Ibinyabiziga bikurikira bigomba gukorerwa isuzumwa buri mwaka:
a) Ibinyabiziga bigenewe gutwara abagenzi muri rusange
b) Ibinyabiziga bigenewe gutwara ibintu birengeje toni 3.5
c) Ibinyabiziga bigenewe kwigisha gutwara 
(d) Nta gisubizo cy’ukuri kirimo

6. Ubugari bwa romoruki ikuruwe n’ikinyamitende itatu ntibugomba kurenza ibipimo bikurikira:
a) cm75 
b) cm125 
c) cm265 
(d) Nta gisubizo cy’ukuri

7. Uburebure bw’ibinyabiziga bikurikira ntibugomba kurenga metero 11 :
a) Ibifite umutambiko umwe uhuza imipira
b) Ibifite imitambiko ibiri ikurikiranye mu bugari bwayo
c) Makuzungu
(d) Nta gisubizo cy’ukuri

8. Ikinyabiziga kibujijwe guhagarara akanya kanini aha hakurikira : 
a) Ahatarengeje metero 1 imbere cyangwa inyuma y’ikinyabiziga gihagaze akanya gato cyangwa kanini :
b) Ahantu hari ibimenyetso bibuza byabugenewe
c) Aho abanyamaguru banyura mu muhanda ngo bakikire inkomyi
(d) Ibisubizo byose nibyo

9. Kunyuranaho bikorerwa:
a) Mu ruhande rw’iburyo gusa
b) Igihe cyose ni ibumoso
c) Iburyo iyo unyura ku nyamaswa
(d) Nta gisubizo cy’ukuri kirimo

10. Icyapa cyerekana umuvuduko ntarengwa ikinyabiziga kitagomba kurenza gishyirwa gusa ku binyabiziga bifite uburemere ntarengwa bukurikira:
a) Burenga toni 1 
b) Burenga toni 2
c) Burenga toni 24
(d) Nta gisubizo cy’ukuri kirimo

11. Ahatari mu nsisiro umuvuduko ntarengwa mu isaha wa velomoteri ni: 
(a) Km50
b) Km40
c) Km30
d) Nta gisubizo cy’ukuri

12. Umuyobozi ugenda mu muhanda igihe ubugari bwawo budatuma anyuranaho nta nkomyi ashobora kunyura mu kayira k’abanyamaguru ariko amaze kureba ibi bikurikira:
a) Umuvuduko w’abanyamaguru
b) Ubugari bw’umuhanda
c) Umubare w’abanyamaguru
(d) Nta gisubizo cy’ukuri kirimo

13. Ku byerekeye kwerekana ibinyabiziga n’ukumurika kwabyo ndetse no kwerekana ihindura ry’ibyerekezo byabyo. Birabujijwe gukora andi matara cyangwa utugarurarumuri uretse ibitegetswe ariko ntibireba amatara akurikira: 
a) Amatara ndanga 
(b) Amatara ari imbere mu modoka 
c) Amatara ndangaburambarare
d) Ibisubizo byose nibyo

14. Iyo nta mategeko awugabanya by’umwihariko umuvuduko ntarengwa w’amapikipiki mu isaha ni:
a) Km25 
b) Km70 
c) Km40 
(d) Nta gisubizo cy’ukuri kirimo

15. Uburyo bukoreshwa kugirango ikinyabiziga kigende gahoro igihe feri idakora neza babwita:
a) Feri y’urugendo 
b) Feri yo guhagarara umwanya munini
(c) Feri yo gutabara
d) Nta gisubizo cy’ukuri kirimo

16. Nibura ikinyabiziga gitegetswe kugira uduhanagurakirahure tungahe:
a) 2 
b) 3 
(c) 1 
d) Nta gisubizo cy’ukuri kirimo

17. Amatara maremare y’ikinyabiziga agomba kuzimwa mu bihe bikurikira:
a) Iyo umuhanda umurikiye umuyobozi abasha kureba muri metero 20
(b) Iyo ikinyabiziga kigiye kubisikana n’ibindi
c) Iyo ari mu nsisiro
d) Ibisubizo byose ni ukuri

18. Ikinyabiziga ntigishobora kugira amatara arenga abiri y’ubwoko bumwe keretse kubyerekeye amatara akurikira: 
a) Itara ndangamubyimba
b) Itara ryerekana icyerekezo
c) Itara ndangaburumbarare
(d) Ibisubizo byose ni ukuri

19. Ubugari bwa romoruki ikuruwe n’igare cyangwa velomoteri ntiburenza ibipimo bikurikira:
a) cm25
b) cm125
c) cm45
(d) Nta gisubizo cy’ukuri kirimo

20. Ibinyabiziga bikoreshwa nka tagisi, bitegerereza abantu mu nzira nyabagendwa, bishobora gushyirwaho itara ryerekana ko ikinyabiziga kitakodeshejwe. Iryo tara rishyirwaho ku buryo bukurikira:
(a) Ni itara ry’icyatsi rishyirwa imbere ku kinyabiziga
b) Ni itara ry’icyatsi rishyirwa ibumoso
c) Ni itara ry’umuhondo rishyirwa inyuma
d) A na C ni ibisubizo by’ukuri

21. Za otobisi zagenewe gutwara abanyeshuri zishobora gushyirwaho amatara abiri asa n’icunga rihishije amyasa kugirango yerekane ko zihagaze no kwerekana ko bagomba kwitonda, ayo matara ashyirwaho ku buryo bukurikira :
a) Amatara abiri ashyirwa inyuma
b) Amatara abiri ashyirwa imbere
(c) Rimwe rishyirwa imbere irindi inyuma 
d) b na c ni ibisubizo by’ukuri

22. Itara ryo guhagarara ry’ibara ritukura rigomba kugaragara igihe ijuru rikeye nibura mu ntera ikurikira:
a) Metero 100 ku manywa na metero 20 mu ijoro
b) Metero 150 ku manywa na metero50 mu ijoro
c) Metero 200 ku manywa na metero100 mu ijoro
(d) Nta gisubizo cy’ukuri kirimo

23. Iyo umuvuduko w’ibinyabiziga bidapakiye ushobora kurenga km50 mu isaha ahategamye, bigomba kuba bifite ibikoresho by’ihoni byumvikanira mu ntera: 
a) Metero 100 
b) Metero 200 
(c) Metero 50 
d) Metero 150

24. Birabujijwe kugenza ibinyabiziga bigendeshwa na moteri naza romoruki zikururwa nabyo, iyo ibiziga byambaye inziga zidahagwa cyangwa inziga zikururuka zifite umubyimba uri hasi ya cm 4. Ariko ibyo ntibikurikizwa kubinyabiziga bikurikira:
a) Ku binyabiziga by’ingabo bijya ahatarenga km25
b) Ibinyabiziga bihinga
c) Ibinyabiziga bya police
(d) Nta gisubizo cy’ukuri kirimo

25. Igice cy'inzira nyabagendwa kigarukira ku mirongo ibiri yera icagaguye ibangikanye kandi gifite ubugari budahagije kugira ngo imodoka zitambuke neza, kiba ari: 
a) Ahanyurwa n’amagare na velomoteri 
b) Ahanyurwa n’ingorofani
(c) Ahanyurwa n’ibinyamitende
d) Nta gisubizo cy’ukuri kirimo

26. Ubugari bwa romoruki ntiburenza ubugari bw’ikinyabiziga kiyikurura iyo ikuruwe n’ibinyabiziga bikurikira:
a) Igare
b) Velomoteri
(c) Ipikipiki ifite akanyabiziga kometse ku ruhande rwayo
d) Nta gisubizo cy’ukuri kirimo

27. Iyo hatarimo indi myanya birabujijwe gutwara ku ntebe y’imbere y’imodoka abana badafite imyaka:
a) Imyaka 10
(b) Imyaka 12
c) Imyaka 7
d) Ntagisubizo cy’ukuri kirimo

28. Icyapa kivuga gutambuka mbere y’ibinyabiziga biturutse imbere gifite amabara akurikira:
a) Ubuso ni umweru
b) Ikirango ni umutuku n’umukara
c) Ikirango ni umweru n’umukara
(d) Nta gisubizo cy’ukuri kirimo

29. Ni ryari itegeko rigenga gutambuka mbere kw’iburyo rikurikizwa mu masangano:
a) Iyo nta cyapa cyo gutambuka mbere gihari
b) Iyo ikimenyetso kimurika cyagenewe ibinyabiziga kidakora
(c) A na B ni ibisubizo by’ukuri
d) Nta gisubizo cy’ukuri

30. Ibimenyetso bimurika byerekana uburyo bwo kugendera mu muhanda kw'ibinyabiziga bishyirwa iburyo bw'umuhanda. Ariko bishobora no gushyirwa ibumoso cyangwa hejuru y’umuhanda:
a) Hakurikijwe icyerekezo abagenzi bireba baganamo
b) Hakurikijwe icyo ibyo bimenyetso bigamije kwerekana
(c) Kugirango birusheho kugaragara neza
d) Ibisubizo byose ni ukuri

31. Iyo itara ry’umuhondo rimyatsa rikoreshejwe mu masangano y’amayira ahwanyije agaciro rishyirwa ahagana he:
a) Kuri buri nzira
b) Hagati y’amasangano
c) Iburyo bw’amasangano
(d) a na b ni ibisubizo by’ ukuri

32. Inkombe z’inzira nyabagendwa cyangwa z’umuhanda zishobora kugaragazwa n’ibikoresho ngarurarumuri. Ibyo bikoresho bigomba gushyirwaho ku buryo abagenzi babibona :
a) Babona gusa ibumoso bwabo iby’ibara ritukura
b) Iburyo babona iby’ibara risa n’icunga rihishije gusa
c) Babona iby’ibara ry’umuhondo ibumoso
(d) Nta gisubizo cy’ukuri kirimo

33. Ibinyabiziga bikurikira bigomba gukorerwa isuzumwa rimwe mu mezi 6:
a) Ibinyabiziga bitwara abagenzi muri rusange
b) Ibinyabiziga bigenewe gutwara ibintu birengeje toni 3.5
c) Ibinyabiziga bigenewe kwigisha gutwara 
(d) Ibisubizo byose ni ukuri

34. Iyo kuyobya umuhanda ari ngombwa bigaragazwa kuva aho uhera no kuburebure bwawo n’icyapa gifite ubuso bw’amabara akurikira:
(a) Ubururu 
b) Umweru 
c) Umutuku
d) Nta gisubizo cy’ukuri

35. Ku mihanda ibyapa bikurikira bigomba kugaragazwa ku buryo bumwe:
a) Ibyapa biyobora n’ibitegeka
b) Ibyapa biburira n’ibitegeka
(c) Ibyapa bibuza n’ibitegeka
d) Nta gisubizo cy’ukuri kirimo

36. Ni iyihe feri ituma imodoka igenda buhoro kandi igahagarara ku buryo bwizewe bubangutse kandi nyabwo, uko imodoka yaba yikoreye kose yaba igeze ahacuramye cyangwa ahaterera:
(a) Feri y’urugendo
b) Feri yo gutabara
c) Feri yo guhagarara umwanya munini
d) Nta gisubizo cy’ukuri kirimo

37. Ibizirikisho by’iminyururu cyangwa by’insinga kimwe n’ibindi by’ingoboka bikoreshwa gusa igihe nta kundi umuntu yabigenza kandi nta kindi bigiriwe uretse gusa kugirango ikinyabiziga kigere aho kigomba gukorerwa kandi nturenze na rimwe km 20 mu isaha, ibyo bizirikisho bigaragazwa ku buryo bukurikira:
a) Agatambaro gatukura kuri cm 50 z’umuhanda 
b) Ikimenyetso cy’itara risa n’icunga rihishije 
c) Icyapa cyera cya mpande enye zingana gifite cm 20 kuri buri ruhande
(d) Nta gisubizo cy’ukuri kirimo

38. Uretse mu mujyi, ku yindi mihanda yajyenwe na minisitiri ushinzwe gutwara abantu n’ibintu, uburemere ntarengwa ku binyabiziga bifite imitambiko itatu cyangwa irenga hatarimo makuzungu ni :
a) Toni 10 
b) Toni 12
(c) Toni 16 
d) Toni 24

39. Ubugari bw’imizigo yikorewe n’ibinyamitende itatu n’ubwiyikorewe n’ibinyamitende 4 bifite cyangwa bidafite moteri kimwe n’ubw’iyikorewe na romuruki zikuruwe n’ibyo binyabiziga ntibushobora kurenga ibipimo bikurikira:
a) cm 30 ku bugari bw’icyo kinyabiziga kidapakiye
b) Ubugari ntarengwa budakuka ni metero 2 na sentimetero 50
(c) A na B ni ibisubizo by’ukuri
d) Nta gisubizo cy’ukuri kirimo

40. Kunyura ku binyabiziga bindi, uretse icy’ibiziga bibiri, bibujijwe aha hakurikira:
a) Hafi y’iteme iyo hari umuhanda ufunganye
b) Hafi y’aho abanyamaguru banyura
c) Hafi y’ibice by’umuhanda bimeze nabi
(d) Ibi bisubizo byose ni ukuri

41. Iyo nta mategeko awugabanya by’umwihariko, umuvuduko ntarengwa ku modoka zitwara abagenzi mu buryo bwa rusange ni:
(a) Km 60 mu isaha 
b) Km 40 mu isaha 
c) Km 25 mu isaha 
d) Km20 mu isaha

42. Iyo nta mategeko awugabanya by’umwihariko, umuvuduko ntarengwa ku modoka zikoreshwa nk’amavatiri y’ifasi cyangwa amatagisi zifite uburemere bwemewe butarenga kilogarama 3500 ni:
a) Km 60 mu isaha 
b) Km 40 mu isaha 
(c) Km 75 mu isaha 
d) Km20 mu isaha

43. Ikinyabiziga kibujijwe guhagarara akanya kanini aha hakurikira :
a) Imbere y’ahantu hinjirwa hakasohokerwa n’abantu benshi
b) Mu muhanda aho ugabanyijemo ibisate bigaragazwa n’imirongo idacagaguye 
(c) A na B ni ibisubizo by’ukuri
d) Nta gisubizo cy’ukuri kirimo

44. Iyo bwije kugeza bukeye cyangwa bitewe n’uko ibihe bimeze nk’igihe cy’ibihu cyangwa cy’imvura bitagishoboka kubona neza muri m 200, udutsiko twose tw’abanyamaguru nk’imperekerane cyangwa udutsiko tw’abanyeshuri bari ku murongo bayobowe n’umwarimu, iyo bagenda mu muhanda ku isonga hakaba hari abantu barenze umwe bagomba kugaragazwa kuburyo bukurikira :
a) Imbere ni itara ry’umuhondo ritwariwe ibumoso
b) Inyuma ni itara ryera ritwariwe ibumoso n’umuntu uri ku murongo w’inyuma hafi y’umurongo ugabanya umuhanda mo kabiri 
c) A na B ni ibisubizo by’ukuri
(d) Nta gisubizo cy’ukuri kirimo

45. Utuyira turi ku mpande z’umuhanda n’ inkengero zigiye hejuru biharirwa abanyamaguru mu bihe bikurikira:
a) Iyo hari amategeko yihariye yerekanwa n’ibimenyetso 
b) Iyo badatatanye kandi bayobowe n’umwarimu
(c) Iyo hatari amategeko yihariye yerekanwa n’ibimenyetso
d) Ibisubizo byose ni ukuri

46. Imburira zimurika zemerewe gukoreshwa kugirango bamenyeshe umuyobozi ko bagiye kumunyuraho aha hakurikira:
a) Mu nsisiro gusa
b) Ahegereye inyamaswa zikurura
c) Hafi y’amatungo 
(d) Nta gisubizo cy’ukuri kirimo

47. Uburemere ntarengwa bwemewe ntibushobora kurenga ½ cy’uburemere bw’ikinyabiziga gikurura nubw’umuyobozi kuri romoruki zikurikira :
a) Romoruki ifite feri y’urugendo
(b) Romoruki idafite feri y’urugendo
c) Romoruki itarenza kg 750
d) Nta gisubizo cy’ukuri kirimo

48. Ibinyabiziga bifite ubugari bufite ibipimo bikurikira bigomba kugira amatara ndangaburumbarare :
(a) Metero 2 na cm 10
b) Metero 2 na cm 50
c) Metero 3 
d) Metero 2

49. Nta tara na rimwe cyangwa akagarurarumuri bishobora kuba bifunze ku buryo igice cyabyo cyo hasi cyane kimurika kitaba kiri hasi y’ibipimo bikurikira kuva ku butaka igihe ikinyabiziga kidapakiye :
a) Cm 30 
(b) Cm 40 
c) Cm 50 
d) Metero 1 na cm 55

50. Iyo ikinyabiziga gifite amatara abiri cyangwa menshi y’ubwoko bumwe ayo matara agomba kugira ibara rimwe n’ingufu zingana kandi akagomba gushyirwaho ku buryo buteganye uhereye ku murongo ugabanya ikinyabizigamo kabiri mu burebure bwacyo. Ariko ibi ntibikurikizwa ku matara akurikira:
a) itara ndangamubyimba
b) itara ndangaburumbarare
(c) itara ribonesha icyapa kiranga numero y’ikinyabiziga inyuma
d) A na B byose nibyo

51. Ahari hejuru cyane y’ubuso bumurika h’amatara ndangambere na ndanganyuma ntihashobora kuba aharenze ibipimo bikurikira hejuru y’ubutaka iyo ikinyabiziga kidapakiye:
a) m1 na cm 50 
b) m1 na cm 75
(c) m 1 na cm 90
d) m2 na cm 10

52. Ni ryari ikinyabiziga gishobora kugenda mu muhanda moteri itaka cyangwa vitesi idakora:
a) igihe kigenda ahamanuka
(b) igihe gikuruwe n’ikindi kinyabiziga
c) igihe gifite feri y’urugendo
d) ibisubizo byose ni byo

53. Umurongo mugari wera udacagaguye ushobora gucibwa ku muhanda kugirango ugaragaze ibi bikurikira:
(a) inkombe mpimbano z’umuhanda
b) ahahagararwa umwanya muto n’umunini
c) ahanyura abayobozi b’amagare
d) nta gisubizo cy’ukuri kirimo

54. Buri modoka cyangwa buri romoruki ikuruwe n’iyo modoka bishobora kugira itara risa n’icyatsi kibisi bituma umuyobozi yerekana ko yabonye ikimenyetso cy’uwitegura kumunyuraho. Iryo tara rigomba gushyirwa aha hakurikira:
a) hafi y’inguni y’ibumoso bw’ikinyabiziga
b) inyuma hafi y’impera y’iburyo bw’ikinyabiziga
c) inyuma ahegereye inguni y’iburyo
(d) nta gisubizo cy’ukuri kirimo

55. Ibinyabiziga bikurikira bigomba kugira icyerekana umuvuduko kiri aho umuyobozi areba neza kandi kigahora kitabwaho kugirango kigume gukora neza:
a) ibinyabiziga bifite umuvuduko nibura wa km 60 mu isaha
(b) ibinyabiziga bishobora kurenza km 40 mu isaha
c) ibinyabiziga bishobora kurenza km 30 mu isaha 
d) ibinyabiziga bishobora kurenza km 25 mu isaha

56. Ubugari bw’imizigo yikorewe n’ipikipiki idafite akanyabiziga ko kuruhande kimwe n’ubwa romoruki ikuruwe na bene icyo kinyabiziga ntibushobora kurenza ibipimo bikurikira:
(a) m 1.25 
b) cm 30 
c) cm 75 
d) nta gisubizo cy’ukuri kirimo

57. Ibinyabiziga bikurikira bigomba kugira itara ry’ubururu rimyatsa riboneka mu mpande zose:
a) ibinyabiziga bifite ubugari burenga m 2 na cm 10
b) ibinyabiziga bya police y’igihugu 
(c) ibinyabiziga ndakumirwa
d) ibisubizo byose ni ukuri

58. Ibinyabiziga bihinga n’ibindi bikoresho byihariye bikoreshwa n’ibigo bipatana imirimo, iyo bigenda mu nzira nyabagendwa igihe cya nijoro cyangwa bitewe n’uko ibihe bimeze bitagishoboka kubona neza muri m 200 bishobora kugaragazwa inyuma n’amatara 2 atukura, bipfa kuba bitarenza ibipimo bikurikira:
a) kutarenza umuvuduko wa km20 mu isaha 
b) uburebure bwabyo habariwemo ibyo bitwaye bukaba butarengeje m6
c) uburebure ntarengwa ntiburenga m8
(d) A na B nibyo bisubizo by’ukuri

59. Iyo romoruki iziritse ku kinyamitende, velomoteri n’amapikipiki bidafite akanyabiziga ko kuruhande uretse ikinyamitende na velomoteri bidafite umuyobozi, iyo uburumbarare bwayo cyangwa bw’ibyo yikoreye bituma itara ry’ikinyabiziga gikurura ritagaragara igihe bitagishoboka kubona neza muri m 200 bigomba kugaragazwa ku buryo bukurikira:
(a) itara ryera cyangwa ry’umuhondo cyangwa risa n’icunga rihishije riri kuri rumoruki inyuma
b) itara ry’icyatsi cyangwa ry’umuhondo cyangwa risa n’icunga rihishije riri kuri rumoruki inyuma
c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

60. Ku kinyabiziga cyangwa ibinyabiziga bikururana igice kirenga ku biziga ntikigomba kurenga ibipimo bikurikira:
(a) inyuma ni m 3 na cm 50
b) imbere ni m 1 na cm 70
c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

61. Iyo amatara y’ikinyabiziga agomba gucanwa kandi igihe imizigo isumba impera y’ikinyabiziga ho metero irenga igice gihera cy’imizigo kigaragazwa ku buryo bukurikira:
a) itara ritukura cyangwa akagarurarumuri ku mutuku ku manywa
b) agatambaro gatukura gafite nibura cm 50 z’uruhande mu ijoro
c) itara ry’umuhondo cyangwa akagarurarumuri k’umuhondo
(d) nta gisubizo cy’ukuri kirimo

62. Iyo imizigo igizwe n’ibinyampeke, ikawa, ipamba idatonoye, ibishara, ibyatsi, ibishami cyangwa ubwatsi bw’amatungo bidahambiriye uretse amapaki afunze, ubugari bwayo bushobora kugera ku bipimo bikurikira:
a) m 2.50 
(b) m 2.75
c) m 3 
d) nta gisubizo cy’ukuri kirimo

63. Uretse mu mijyi kuyindi mihanda yagenywe na minisiteri ushinzwe gutwara ibintu n’abantu, uburemere ntarengwa bwemewe ku binyabiziga bifatanye bifite imitambiko itatu ni:
a) toni 20 
b) toni 16 
(c) toni 12 
d) toni 10

64. Buri modoka cyangwa buri romoruki ikuruwe n’iyo modoka bishobora kugira itara rituma umuyobozi yerekana ko yabonye ikimenyetso cy’uwitegura kumunyuraho. Iryo tara rifite amabara akurikira: 
a) umuhondo 
(b) icyatsi kibisi 
c) umweru 
d) umutuku

65. Ikinyabiziga cyangwa ibinyabiziga bikururana bifite imitambiko ibiri ikurikiranye mu bugari bwayo ni ukuvuga imitambiko yihindukiza kucyo ifungiyeho, uburebure bwabyo ntibugomba kurenza ibipimo bikurikira:
a) m11 
b) m10 
(c) m7 
d) nta gisubizo cy’ukuri kirimo

66. Bumwe muri ubu bwoko bwa feri ituma imodoka iguma aho iri uko yaba yikoreye kose ku muzamuko cyangwa ku gacuri bya 16%, imyanya ya feri igomba gufata igakomeza kwegera kuburyo bw’ibyuma niyo umuyobozi yaba atarimo:
(a) feri yo guhagarara umwanya munini
b) feri y’urugendo
c) feri yo gutabara
d) nta gisubizo cy’ukuri kirimo

67. Utugarurarumuri turi mu mbavu z’ikinyabiziga tugomba kugira ibara rikurikira:
a) umweru
(b) umuhondo 
c) umutuku 
d) Nta gisubizo cy’ukuri kirimo

68. Romoruki zifite ubugari ntarengwa bwa cm 80 zishobora gushyirwaho akagarurarumuri kamwe gusa iyo zikuruwe n’ibinyabiziga bikurikira:
a) velomoteri 
(b) ipikipiki idafite akanyabiziga ku ruhande 
c) amavatiri y’ifasi 
d) nta gisubizo cy’ukuri kirimo

69. Amatara maremare y’ibara ryera cyangwa ry’umuhondo agomba, nijoro igihe ijuru rikeye, kumurika mu muhanda mu ntera ya m 100 nibura imbere y’ikinyabiziga, ariko ku binyabiziga bifite moteri itarengeje za sentimetero kibe 125 iyo ntera igira ibipimo bikurikira:
a) m200 
b) m100 
c) m85 
(d) nta gisubizo cy’ukuri kirimo

70. Iyo banyuze iruhande rw’inkomyi abanyamaguru bagomba gukikira banyuze mu muhanda, abayobozi bagomba gusiga umwanya ufite ubugari bwa m 1 nibura hagati yabo nayo. Iyo ibyo bidashobora kubahirizwa kandi umunyamaguru akaba anyura hafi yiyo nkomyi, umuyobozi agomba kuyikikira afite umuvuduko utarengeje ibipimo bikurikira: 
a) km 10 mu isaha
b) km 20 mu isaha
c) km 30 mu isaha
(d) nta gisubizo cy’ukuri kirimo

71. Guhagarara akanya gato no guhagarara akanya kanini bibujijwe cyane cyane aha hakurikira:
a) ku mihanda y’icyerekezo kimwe hose
(b) mu ruhande ruteganye n’urwo ikindi kinyabiziga gihagazemo akanya gato cyangwa kanini 
c) ku mihanda ibisikanirwamo, iyo ubugari bw’umwanya w’ibinyabiziga ugomba gutuma bibisikana butagifite m12
d) ibisubizo byose nibyo

72. Amatara ndangambere n’aya ndanganyuma y’imodoka zitarengeje m 6 z’uburebure na m 2 z’ubugari habariwemo imitwaro kdi nta kinyabiziga kindi kiziritseho ashobora gusimburwa n’amatara akurikira, iyo ibyo binyabiziga bihagaze umwanya muto cyangwa munini mu nsisiro bibangikanye ku ruhande rw’umuhanda:
a) amatara magufi
b) amatara ndangaburumbarare
(c) amatara yo guhagarara umwanya munini
d) nta gisubizo cy’ukuri kirimo

73. Iyo kuva bwije kugeza bukeye cyangwa bitewe nuko ibihe bimeze nk’igihe cy’igihu cyangwa cy’imvura bitagishoboka kubona neza muri m 200, imirongo y’ingabo z’igihugu zigendera kuri gahunda n’utundi dutsiko twose tw’abanyamaguru nk’imperekerane cyangwa udutsiko tw’abanyeshuri bari ku murongo bayobowe na mwarimu, iyo bagenda mu muhanda ku isonga hakaba hari abantu barenze umwe, bagaragzwa ku buryo bukurikira:
(a) imbere ni itara ryera ritwariwe ku ruhande rw’ibumoso n’umuntu uri ku murongo w’imbere hafi y’umurongo ugabanya umuhanda mo kabiri 
b) inyuma ni itara umuhondo ritwariwe ku ruhande rw’ibumoso n’umuntu uri ku murongo w’inyuma hafi y’umurongo ugabanya umuhanda mo kabiri
c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

74. Imizigo yikorewe n’amagare, velomoteri, amapikipiki, ibinyamitende by’ibiziga bitatu nibyo ibiziga bine bifite cyangwa bidafite moteri inyuma ntishobora kurenza ibipimo bikurikira:
a) cm 20 
b) cm 30 
(c) cm 50 
d) cm 60

75. Itara ndanganyuma rigomba gushyirwa aha hakurikira:
(a) ahagereye inguni y’ibumoso y’ikinyabiziga
b) ahagereye inguni y’iburyo bw’ikinyabiziga
c) inyuma kandi y’impera y’ibumoso bw’ikinyabiziga
d) nta gisubizo cy’ukuri kirimo

76. Nta tara na rimwe cyangwa utugarurarumuri bishobora kuba bifunze kuburyo igice cyabyo cyo hasi cyane kimurika kitaba kiri hasi ya cm 40 kuva ku butaka igihe ikinyabiziga kidapakiye ariko ibyo ntibikurikizwa ku matara akurikira:
a) amatara kamenabihu
b) amatara yo gusubira inyuma
(c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

77. Iyo tumuritswe n’amatara y’urugendo y’i kinyabiziga utugarurarumuri tugomba n’ijoro, igihe ijuru rikeye kubonwa n’umuyobozi w’ikinyabiziga kiri mu ntera ikurikira:
a) metero 100 
(b) metero 150 
c) metero 200 
d) nta gisubizo cy’ukuri kirimo

78. Ibinyabiziga bigendeshwa na moteri, hatarimo velomoteri n’ibinyabiziga bidapakiye umuvuduko wabyo udashobora kurenga km 50 mu isaha ahateganye bigomba kuba bifite ibikoresho by’ihoni byumvikanira mu ntera ikurikira:
a) metero 200 
b) metero 150 
(c) metero 100 
d) metero 50

79. Ahatari mu nsisiro ibyapa biburira n’ibyapa byo gutambuka mbere bigomba gushyirwa mu ntera ikurikira y’ahantu habyerekana:
(a) metero 150 kugeza kuri 200
b) metero 100 kugeza kuri 150
c) metero 50 kugeza kuri 100
d) nta gisubizo cy’ukuri kirimo

80. Inkombe z’inzira nyabagendwa cyangwa z’umuhanda zishobora kugaragazwa n’ibikoresho ngarurarumuri. Ibyo bikoresho bigomba gushyirwaho ku buryo abagenzi babibona ku buryo bukurikira:
a) babona iburyo bwabo ibyibara ritukura cyangwa ibisa n’icunga rihishije
b) ibumoso babona iby’ibara ryera
(c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

81. Ahatari mu nsisiro, umuyobozi wese ugenza ikinyabiziga kimwe cyangwa ibinyabiziga bikomatanye bifite uburemere ntarengwa bwemewe burenga ibiro 3500 cyangwa bifite uburebure bwite burenga metero 10 agomba, keretse iyo anyuze cyangwa agiye kunyura ku bindi binyabiziga, gusiga hagati y’ikinyabiziga cye n’iki muri imbere umwanya uhagije kugirango ibinyabiziga bimuhiseho bishobore kuhigobeka bidateje impanuka igihe bibaye ngombwa ariko ibyo ntibikurikizwa mu bihe bikurikira:
(a) mu gihe ibigendera mu muhanda ari byinshi kimwe no mu duce tw'inzira nyabagendwa aho kunyuranaho bibujijwe
b) igihe ibigendera mu muhanda ari byinshi
c) mu duce tw’inzira nyabagendwa aho kunyuranaho bibujijwe
d) nta gisubizo cy’ukuri kirimo

82. Ibiziga by’ibinyabiziga bigendeshwa na moteri n’ibya velomoteri kimwe n’ibya romoruki zabyo bigomba kuba byambaye inziga zihagwa zifite amano n’ubujyakuzimu butari munsi ya milimetero imwe ku migongo yabyo yose nubudodo bwabyo ntibugire ahantu na hamwe bugaragara kandi ntibugire aho byacitse bikomeye mu mpande zabyo ariko ibyo ntibikurikizwa ku binyabiziga bikurikira:
(a) ibinyabiziga bidapakiye kandi bitajya birenza umuvuduko wa km 25 mu isaha ahateganye
b) ibinyabiziga bya police bijya ahatarenga km 25 uvuye aho biba
c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

83. Amatara ndangacyerekezo agomba kuba agizwe n’ibintu bifashe ku rumuri rumyasa, biringaniye ku buryo bigira umubare utari igiharwe ku mpande z’imbere n’inyuma z’ikinyabiziga ayo matara aba afite amabara akurikira:
a) amatara y’imbere aba yera cyangwa ari umuhondo
b) ayinyuma aba atukura cyangwa asa n’icunga rihishije
(c) A na B ni ibisubizo by’ukuri
d) ayinyuma aba asa n’icunga rihishije

84. Amahoni y’ibinyabiziga bigendeshwa na moteri agomba kohereza ijwi ry’injyana imwe rikomeza kandi ridacengera amatwi ariko ibinyabiziga bikurikira bishobora kugira ihoni ridasanzwe ridahuye n’ibivuzwe haruguru:
a) ibinyabiziga ndakumirwa
b) ibinyabiziga bikora ku mihanda
c) ibinyabiziga bifite ubugari burenze m 2.10
(d) A na B ni ibisubizo by’ukuri

85. Icyapa kibuza kunyura kubindi binyabiziga byose uretse ibinyamitende ibiri n’amapikipiki adafite akanyabiziga ku ruhande gifite ibimenyetso by’amabara akurikira:
a) umweru n’umukara
(b) umutuku n’umukara
c) ubururu
d) A na B ni ibisubizo by’ukuri

86. Icyapa kivuga ko hatanyurwa mu byerekezo byombi kirangwa n’ubuso bw’ibara rikurikira:
a) umukara 
(b) umweru 
c) ubururu 
d) umutuku

87. Ibinyabiziga bikurikira bigomba kugira ibikoresho by’ihoni byumvikanira mu ntera ya m 20:
a) amapikipiki
(b) velomoteri
c) ibinyabiziga bigendeshwa na moteri bidapakiye
d) nta gisubizo cy’ukuri kirimo

88. Imirongo y’ingabo z’igihugu zigendera kuri gahunda n’utundi dutsiko twose tw’abanyamaguru nk’imperekerane cyangwa udutsiko tw’abanyeshuri iyo bitagishoboka kubona neza muri m200, bagaragazwa ni itara ryera imbere naho inyuma ni itara ry’umutuku ariko iyo uburebure bwiyo mirongo cyangwa bw’utwo dutsiko burenga m6 impande zatwo cyangwa zayo zigaragazwa ku buryo bukurikira:
a) itara rimwe cyangwa menshi yera
b) amatara menshi y’umuhondo
c) amatara menshi asa n’icunga rihishije
(d) ibisubizo byose nibyo

89. Amatara ndangambere na ndanganyuma y’imodoka zitarengeje m 6 z’uburebure na m 2 z’ubugari habariwemo imitwaro kandi nta kindi kinyabiziga kiziritseho ashobora gusimburwa n’amatara yo guhagarara umwanya munini iyo ibyo binyabiziga bihagaze umwanya muto cyangwa munini mu nsisiro bibangikanye ku ruhande rw’umuhanda. Ayo matara arangwa n’amabara akurikira:
a) umweru cyangwa umuhondo imbere
b) umutuku cyangwa umuhondo inyuma
(c) A na B ni ibisubizo by’ukuri 
d) nta gisubizo cy’ukuri kirimo

90. Amatara ndangaburumbarare agomba kubonwa nijoro igihe ijuru rikeye n’umuyobozi w’ikinyabiziga kiri mu ntera ya :
a) m 50 nibura 
b) m 100
c) m 150 
(d) m 200 nibura

91. Uretse ku byerekeye imihanda iromboreje y’ibisate byinshi n’imihanda yimodoka igice cy’umuhanda kiri hakurya y’umurongo mugari wera ucibwa ku muhanda ngo ugaragaze inkombe mpimbano zawo kigenewe ibi bikurikira:
a) guhagararwamo umwanya muto gusa
b) guhagararwamo umwanya munini gusa
(c) guhagararwamo umwanya muto n’umunini
d) nta gisubizo cy’ukuri kirimo

92. Ibimenyetso by’agateganyo bigizwe n’imitemeri y’ibara risa n’icunga rihishije bishobora gusimbura ibi bikurikira:
a) imirongo yera irombereje idacagaguye gusa
(b) imirongo yera irombereje idacagaguye n’icagaguye
c) imirongo icagaguye n’idacagaguye ibangikanye
d) nta gisubizo cy’ukuri kirimo

93. Iyo bitagishoboka kubona muri m 200 imodoka zikuruwe n’inyamaswa, ingorofani, inyamaswa zitwaye imizigo cyangwa zigenderwamo kimwe n’amatungo bigomba kurangwa na :
a) imbere ni itara ryera
b) imbere ni itara ry’umuhondo cyangwa risa n’icunga rihishije
c) inyuma ni itara rimwe ritukura
(d) ibisubizo byose ni ukuri

94. Uretse igihe hari amategeko yihariye akurikizwa muri ako karere ikinyabiziga cyose gihagaze umwanya muto cyangwa munini, iyo gihagaze mu mwanya wo kuruhande wagenewe abanyamaguru, kugirango bashobore kugenda batagombye kunyura mu muhanda, umuyobozi agombye kubasigira akayira gafite byibura ibipimo bikurikira by’ubugari:
(a) m 1
b) m 2
c) m 0.5
d) nta gisubizo cy’ukuri kirimo

95. Icyapa cyerekana ahantu hagenewe guhagararwamo n’imodoka nini zagenewe gutwara abantu cyirangwa n’ubuso bw’amabara akurikira:
a) ubururu
b) umweru
c) umutuku
(d) nta gisubizo cy’ukuri kirimo

96. Icyapa cyerekana ko inzira giteyeho mu ntangiriro idakomeza kigaragazwa n’ikirango (ikimenyetso) cy’amabara akurikira:
a) umukara n’umutuku
b) umukara n’umweru
(c) umweru n’umutuku
d) nta gisubizo cy’ukuri kirimo

97. Buri modoka yagenewe gutwara abantu, ariko umubare wabo ntarengwa ukaba munsi ya 6 umuyobozi abariwemo igomba kugira imikandara yo kurinda ibyago igenewe aba bakurikira:
a) umuyobozi
b) umugenzi wicaye ku ntebe y’imbere
c) ishobora no kugira imikandara kuzindi ntebe z’inyuma
(d) ibisubizo byose ni ukuri

98. Usibye ibinyabiziga by'ingabo z'Igihugu, Ikinyabiziga kigendeshwa na moteri kiriho ibyuma ntamenwa cyangwa ikindi cyose gituma gikoreshwa mu gutera cyangwa mu kwitabara ntigishobora kugenda mu nzira nyabagendwa kidafite uruhushya rwihariye. Urwo ruhushya rutangwa naba bakurikira:
a) police y’igihugu
(b) minisitiri ushinzwe gutwara abantu n’ibintu
c) minisitiri w’ingabo
d) ikigo cy’igihugu gishinzwe imisoro n’amahoro.

99. Iyo umukumbi ugizwe n’amatungo maremare arenze ane cyangwa amatungo magufi arenze atandatu mu nzira nyabagendwa iyo hatakibona neza kuburyo umuyobozi abona muri m 200 ugomba kugaragazwa kuburyo bukurikira:
a) itara ry’urumuri rwera cyangwa rusa n’icunga rihishije imbere y’umukumbi
b) itara ry’urumuri rutukura cyangwaumuhondo ritwawe inyuma y’umukumbi
c) A na B ni ibisubizo by’ukuri
(d) nta gisubizo cy’ukuri kirimo

100. Ibinyabiziga biherekeranyije mu butumwa ntibishobora gutonda uburebure burenga umurongo wa m 500. Iyi bibaye bityo ibinyabiziga biherekeranye mu butumwa bishobora kugabanwamo amatsinda atonze umurongo atarengeje m 50 z’uburebure kdi hagati yayo hakaba byibura m 50 ariko ibyo ntibikurikizwa kubinyabiziga bikurikira:
a) ibinyabiziga bya police biherekeranyije
(b) ibinyabiziga by’abasirikare biherekeranyije mu nsisiro
c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

101. Iyo ikinyabiziga gikururwa n’inyamaswa nacyo gikuruye ikindi uburebure bw’ibikururwa bukaba burenga m 18 hatabariwemo icyo kinyabiziga cya mbere kiziritseho hagomba ibi bikurikira:
(a) umuherekeza w’ikinyabiziga cya kabiri
b) abaherekeza babiri
c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

102. Ibinyabiziga bikurikira ntibitegetswe kugira ibimenyetso bibyerekana iyo byambukiranya umuhanda cyangwa bigenda ku ruhande rwawo:
a) ibinyabiziga bigendwamo n’abana
b) ibinyabiziga bigendwamo n’abamugaye
(c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

103. Icyapa cy’inyongera kigaragaza ikibanza cy’ingando cyangwa cy’abantu benshi bagendera ku nyamaswa kirangwa n’amabara akurikira:
(a) ubururu, umweru n’umukara
b) umukara umweru n’umuhondo
c) icyatsi kibisi, umuhondo n’ikirango cy’umukara
d) nta gisubizo cy’ukuri kirimo

104. Icyapa cyerekana ahantu amategeko y’ Umuhanda urombeje w’ibice byinshi atangirira gukurikizwa, kirangwa n’ibirango (ibimenyetso) by’amabara akurikira:
a) umweru n’umukara
b) umweru n’umutuku
c) umweru n’umuhondo
(d) nta gisubizo cy’ukuri kirimo

105. Igihe ikorwa ry’imirimo ribangamiye cyane cyangwa buke uburyo bwo kugenda mu nzira nyabagendwa, ahakorerwa imirimo hagaragazwa ku buryo bukurikira:
a) icyapa cyera cya mpande enye, zingana zifite uruhande rwa metero 0.30
b) uruzitiro ruri ku mpera y’iburyo
c) A na B ni ibisubizo by’ukuri
(d) nta gisubizo cy’ukuri kirimo

106. Iyo mu muhanda, imirimo yihariye ubugari butuma abayobozi bagomba kuva mu mwanya wabo usanzwe kugirango bakomeze urugendo, ahategetswe kunyurwa hagaragazwa n’ikimenyetso gishyirwa aho imirimo irangirira mu ruhande rugenderwamo. Icyo kimenyetso kirangwa n’amabara akurikira:
(a) ubuso bw’ubururu ikirango cy’umweru
b) umuzenguruko w’umutuku, ubuso umweru n’ikirango cy’umukara
c) umuzenguruko w’umutuku, ubuso mu ibara ryera, ikirango mu ibara ry’umutuku n’umukara
d) nta gisubizo cy’ukuri kirimo

107. Icyapa cyerekana ko hari amabwiriza yihariye mu buryo bwo kugendera mu cyambu cyangwa ku kibuga cy’indege giteye ku buryo bukurikira:
a) ishusho mpandeshatu, ubuso mu ibara ryera, ikirango mu ibara ry’umukara
(b) ishusho mpandenye, ubuso mu ibara ry’ubururu n’ikirango kiri mu ibara ryera
c) ishusho y’uruziga mu ibara ry’ubururu ni ikirango kiri mu ibara ryera 
d) nta gisubizo cy’ukuri kirimo

108. Nijoro igihe ijuru rikeye, itara ribonesha icyapa kiranga numero y’ikinyabiziga rigomba gutuma izo numero zisomerwa nibura mu ntera ikurikira:
a) m150
b) m50
(c) m20
d) m10

109. Ibyapa byerekana icyago cyidahoraho kandi bigenewe kwerekana aho bagana cyangwa aho berekeza umuhanda nk’igihe cy’impanuka cyangwa hari imirimo ikorwa mu muhanda birangwa n’amabara akurikira:
a) umweru n’umukara
b) umweru n’umuhondo
c) ubuso bw’umweru gusa
(d) nta gisubizo cy’ukuri kirimo

110. Birabujijwe kubangamira imigendere isanzwe y’ibindi binyabiziga kubera ibi bikurikira:
a) kugabanya umuvuduko kuburyo budasanzwe
b) gukacira feri bidatewe no kwirinda ibyago
(c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

111. Iyo kuva bwije kugeza bukeye cyangwa bitewe n’uko ibihe bimeze bitagishoboka kubona neza muri m 200, mu nzira nyabagendwa, romoruki iziritse kuri velomoteri cyangwa ipikipiki idafite akanyabiziga ku ruhande, uretse velomoteri idafite umuyobozi, kandi uburumbarare bwayo, cyangwa bw’ibyo yikoreye bukaba butuma itara ry’ikinyabiziga biyikurura ritagaragara, iyo romoruki igaragazwa ku buryo bukurikira:
a) itara ryera riri kuri romoruki inyuma
b) itara ry’umuhondo riri kuri romoruki inyuma 
c) itara risa n’icunga riri kuri romoruki inyuma 
(d) ibi bisubizo byose nibyo

112. Amatara maremare y’ikinyabiziga agomba kuzimwa mu bihe bikurikira:
a) iyo umuhanda umurikiwe hose kandi umuyobozi ashobora kubona nibura mu ntera ingana na metero 200 
b) iyo ikinyabiziga gikurikiye mu ntambwe zitagera muri m100 keretse iyo umuyobozi wacyo ashaka kunyura kucyo akurikiye acana azimya vuba vuba amatara maremare 
(c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

113. Iyo akanyabiziga gasunikwa cyangwa ibyo gatwaye bidatuma umuyobozi abona neza imbere ye, uwo muyobozi agomba gukora ibi bikurikira: 
a) gushaka umuherekeza
(b) gukurura ikinyabiziga cye
c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

114. Uretse igihe hari amategeko yihariye akurikizwa muri ako karere cyangwa imitunganyirize bwite y’aho, ikinyabiziga cyose cyangwa inyamaswa ihagaze umwanya muto cyangwa munini igomba kuba iri aha hakurikira:
a) mu kaboko k’iburyo hakurikijwe aho yaganaga uretse igihe ari mu muhanda w’icyerekezo kimwe
b) ahegereye bishobotse akayira k’abanyamaguru iyo umuhanda ugafite ariko umwanya w’ibiziga n’akayira ntube urenga santimetero 50
(c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

115. Iyo ikinyabiziga gihagaritswe n’ijoro ku buryo abayobozi bakigana badashobora kumenya ko kibabereye imbogamizi, kigomba kurangirwa kure n’ikimenyetso cyabigenewe kiri ahantu hagaragara kugirango kiburire hakiri kare abandi bayobozi baza bagisanga, ariko ntibireba ibinyabiziga bikurikira:
a) velomoteri
b) ipikipiki idafite akanyabiziga ku ruhande
(c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

116. Abanyamaguru batatanye cyangwa bagize udutsiko tudafatanyije gahunda kdi batanayobowe n’umwarimu bategetswe kunyura mu tuyira turi ku mpande z’umuhanda no ku nkengero zigiye hejuru uretse ubutaka butsindagiye butandukanya imihanda ibiri bwo kunyurwamo gusa n’aba bakurikira:
(a) abanyamaguru bashaka guhagarara akanya gato igihe bambukiranya umuhanda
b) abanyamaguru bagize udutsiko tw’abantu benshi
c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

117. Ibinyabiziga biherekeranyije mu butumwa ntibishobora gutonda uburebure burenga umurongo wa m 500, iyo bibaye bityo ibinyabiziga biherekeranyije mu butumwa bishobora kugabanywamo amatsinda atonze umurongo utarengeje ibipimo bikurikira:
(a) utarengeje m50
b) utarengeje m100
c) utarengeje 150
d) nta gisubizo cy’ukuri kirimo

118. Ibyapa byereka inkomane y’inzira nyabagendwa n’inzira ya gariyamoshi bigomba iteka kumurikwa cyangwa kugarura urumuri ku buryo bigaragarira nibura mu ntera ikurikira igihe ijuru rikeye:
a) m200
b) m 250
c) m300
(d) nta gisubizo cy’ukuri kirimo

119. Imbibi ziri ku mpera z’ubwihugiko bw’abanyamaguru kandi ziri mu muhanda kimwe n’imbibi n’ibindi bikoresho bigenewe gutuma bagenda mu muhanda nta muvundo zisigwa irangi ry’ibara rikurikira:
(a) irangi ry’umuhondo ngarurarumuri
b) irangi ry’umweru ngarurarumuri
c) irangi risa n’icunga rihishije ngarurarumuri
d) nta gisubizo cy’ukuri kirimo

120. Kugirango ikinyabiziga kive ahantu hari urwondo cyangwa hanyerera bidasanzwe hashobora gukoreshwa uburyo bukurikira:
a) inziga zishobora gushyirwaho udushyundu
(b) inziga zishobora gushyirwaho iminyururu irwanya ubunyerere
c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

121. Iyo imizigo igizwe n’ibinyampeke, ikawa, amakara, ubwatsi bw’amatungo bidahambiriye, ubugari bwayo bushobora kugera kuri m2 na cm75 ariko iyo iyo mizigo ijyanwa mu karere katarenga km25 uvuye aho yapakiriwe, usibye mu nsisiro, ubugari bwayo bushobora kugera ku bipimo bikurikira:
a) m4 
b) m3 na cm50
(c) m3
d) nta gisubizo cy’ukuri kirimo

122. Mu mujyi no ku mihanda y’igihugu igenwa na minisitiri ushinzwe gutwara abantu n’ibintu, ubwikorere ntarengwa ku ikamyo iyo ariyo yose ntibushobora kurenga ibipimo bikurikira:
a) toni 10
b) toni 16
c) toni 24
(d) nta gisubizo cy’ukuri kirimo

123. Iyo bitewe n’imiterere y’ahantu intera itandukanya icyapa n’ahantu habi iri munsi ya m150 ku buryo bugaragara, iyo ntera yerekanishwa icyapa cy’inyongera giteye ku buryo bukurikira:
a) kare ifite ubuso bw’ibara ryera
(b) urukiramende rufite ubuso bw’ibara ryera
c) mpandeshatu ifite umuzenguruko utukura
d) nta gisubizo cy’ukuri kirimo

124. Nijoro, amatara yo kubisikana y’ibara ryera cyangwa y’umuhondo agomba, igihe ijoro rikeye kumurika mu muhanda nibura mu ntera ikurikira:
a) m100
b) m50
(c) m40
d) nta gisubizo cy’ukuri kirimo

125. Ikintu cyose cyatuma hahindurwa ibyanditse bireba nyirikarita cyangwa ibiranga ikinyabiziga kigomba kumenyeshwa ibiro by’umusoro haba mu magambo cyangwa mu ibaruwa ishinganye ibyo bikorwa mu gihe kingana gute:
a) mu mezi 2
b) mu kwezi kumwe
c) mu minsi cumi n’itanu
(d) nta gisubizo cy’ukuri kirimo

126. Kugirango berekane ahantu habi cyane, hakoreshwa ikimenyetso cy’itara ry’umuhondo rimyasa, rivuga uburenganzira bwo gutambuka icyo kimenyetso barushijeho kwitonda. Ese icyo kimenyetso gihindura iki ku mategeko agenga gutambuka mbere:
(a) ntacyo gihindura
b) abo rireba nibo batambuka mbere
c) abatwaye ibinyabiziga binini nibo batambuka mbere
d) nta gisubizo cy’ukuri kirimo

127. Romoruki zifite ubugari ntarengwa bwa sentimetero 80 zishobora gushyirwaho akagarurarumuri kamwe gusa iyo zikuruwe n’ibinyabiziga bikurikira:
a) velomoteri
b) ipikipiki ifite akanyabiziga kuruhande
c) igare
(d) nta gisubizo cy’ukuri kirimo

128. Amatara maremare y’ibara ryera cyangwa ry’umuhondo agomba nijoro igihe ijuru rikeye kumurika mu ntera ikurikira ku binyabiziga bifite moteri itarengeje ingufu zigera kuri sentimetero kibe 125:
a) m100
(b) m75
c) m25
d) nta gisubizo cy’ukuri kirimo

129. Iyo kuva bwije kugeza bukeye cyangwa bitewe n’uko ibintu bimeze bitagishoboka kubona muri m 200, ibinyabiziga cyangwa imitwaro bifite ubugari burenga m 2.50 iyo bigenda mu nzira nyabagendwa bigaragazwa ku buryo bukurikira:
a) inyuma ni amatara abiri atukura
b) iyo bibaye ngombwa no ku mpera y’amabondo y’ikinyabiziga cyangwa y’imitwaro ni itara ndangaburumbarare risa n’icunga rihishije cyangwa ry’umuhondo
(c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

130. Igice cy’umuhanda kiri hakurya y’umurongo mugari wera udacagaguye ugaragaza inkombe mpimbano y’umuhanda kiba kigenewe ibi bikurikira:
a) guhagararwamo umwanya muto gusa
b) guhagararwamo umwanya muto n’umunini ndetse no kumihanda irombereje y’ibisate byinshi n’imihanda y’imodoka
c) A na B ni ibisubizo by’ukuri
(d) nta gisubizo cy’ukuri kirimo

131. Iminyururu n’ibindi byuma bifashisha bishobora kuvanwaho cyangwa binagana, hatabariwemo ibimenyetso byerekana ibyerekezo bigomba gutungurwa ku kinyabiziga ku buryo igihe byizunguza bitarenga impande zihera uburumbarare bw’ikinyabiziga kandi ibyo byuma bifashisha ntibigomba gukururuka ku butaka ariko ibyo ntibibujijwe ku binyabiziga bikurikira:
(a) imashini zihinga
b) ibinyabiziga bitwaye ibintu bidashobora gufata inkongi
c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

132. Ku binyabiziga cyangwa ibinyabiziga bikururana igice kirenga ku biziga ntigishobora kurenga ibipimo bikurikira:
a) iby’inyuma : m3
(b) iby’imbere: m2.70
c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

133. Uretse bibonewe uruhushya, ubundi birabujijwe gushyira no gukomeza kugendesha imodoka cyangwa romoruki mu nzira nyabagendwa iyo uburemere bw’ibyikorewe burenze uburemere ntarengwa bwemewe n’ikarita iranga ikinyabiziga ariko ibyo ntibikurikizwa ku binyabiziga bikurikira:
a) ibinyabiziga bya police
b) ibinyabiziga bihinga
(c) imashini zikoreshwa mu kubaka imihanda
d) ibisubizo byose ni ukuri

134. Gushyira mu muhanda ku buryo budasanzwe ibinyabiziga bikururana birenze bitatu bigomba gutangirwa uruhusa, uretse imashini ihinga iyo zigenda uregendo rutarenze km 25, ibinyabiziga bikururana bitwaye ibyamamazwa n’ibindi biteganwa n’iri teka ariko igiteranyo cy’uburebure bw’ibyo binyabiziga bikururana ntigishobora kurenga ibipimo bikurikira:
a) m50
b) m35
(c) m25
d) nta gisubizo cy’ukuri kirimo

135. Ibinyamitende itatu bifite moteri bigomba kugira amatara akurikira:
a) amatara abiri ndangambere n’amatara abiri ndanganyuma yerekana ko ikinyabiziga gihagaze
b) utugarurarumuri tubiri
(c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

136. Ibyapa bibuza n’ibitegeka bikurikizwa gusa aha hakurikira:
a) mu masangano
(b) mu gice cy’inzira nyabagendwa kiri hagati yaho bishinze n’inkomane ikurikiyeho ku ruhande rw’inzira bishinzeho
c) ibyo byapa bishyirwaho hakurikijwe intera ibitandukanya
d) B na C ni ibisubizo by’ukuri

137. Icyapa cy’inyongera kerekana aho bagobokera ibinyabiziga kirangwa n’amabara akurikira:
a) ubururu, umweru, umutuku
(b) umweru, umukara, ubururu
c) umutuku, umweru n’umukara
d) nta gisubizo cy’ukuri kirimo

138. Icyapa cyerekana uburebure bw’igice cyatera ibyago cyangwa bw’ahantu amabwiriza y’icyo cyapa agomba gukurikizwa kirangwa n’ubuso n’ibimenyetso bikurikira:
a) ubuso umweru, ikimenyetso ubururu
b) ubuso ubururu, ikimenyetso umweru 
c) ubuso ubururu, ikimenyetso umweru n’umukara
(d) nta gisubizo cy’ukuri kirimo

139. Umurongo w’umuhondo ucagaguye uciye ku nkombe nyayo y’umuhanda, umusezero w’inzira y’abanyamaguru cyangwa w’inkengero y’umuhanda yegutse uvuga ibi bikurikira:
a) guhagarara umwanya muto birabujijwe ku burebure bw’uwo murongo
b) guhagarara umwanya muto n’umunini birabujijwe ku burebure bw’uwo murongo
c) aho bahagarara umwanya munini cyangwa muto
(d) nta gisubizo cy’ukuri kirimo

140. Ku binyabiziga cyangwa ibinyabiziga bikururana igice kirenga ku biziga ntigishobora kurenga ibipimo bikurikira:
a) iby’inyuma m 3.40
b) iby’imbere m 2.50
c) A na B ni ibisubizo by’ukuri
(d) nta gisubizo cy’ukuri kirimo

141. Mu migi no ku yindi mihanda y’igihugu igenwa na minisitiri ushinzwe gutwara abantu n’ibintu uburebure ntarengwa kuri buri mitambiko 3 ifungwaho ibiziga bine ni:
(a) toni 24
b) toni 10
c) toni 16
d) toni 53

142. Iyo hagati y’uruhande rw’imbere rwa romoruki n’uruhande rw’inyuma rw’ikinyabiziga kiyikurura hari umwanya urenze m 3 ikibizirikanyije kigomba kugaragazwa ku buryo bukurikira iyo amatara y’ikinyabiziga agomba gucanwa:
a) agatambaro gatukura gafite nibura cm 50 z’uruhande
(b) itara risa n’icunga rihishije rigaragara mu mbavu igihe ikibizirikanyije kimuritswe
c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

143. Itara ryo guhagarara ry’ibara ritukura rigomba kuba ridahumisha, kandi rigomba kugaragarira mu ntera ikurikira:
a) nijoro igihe ijuru rikeye nibura muri m 200
b) ku manywa igihe cy’umucyo nibura muri m50 
c) nijoro nibura muri m 100 igihe ijuru rikeye 
(d) nta gisubizo cy’ukuri kirimo

144. Birabujijwe kongera ku mpande z’ikinyabiziga kigendeshwa na moteri cyangwa velomoteri ibi bikurikira:
a) imitako
b) ibintu bifite imigongo cyangwa ibirenga ku mubyimba kandi bishobora gutera ibyago abandi bagenzi 
(c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

145. Ikintu cyose cyatuma hahindurwa ibyanditswe bireba nyirikarita cyangwa ibiranga ikinyabiziga kigomba kumenyeshwa ibiro by’imisoro haba mu magambo cyangwa mu ibaruwa ishinganye. Ibyo bikorwa mu gihe kingana gute:
a) mu minsi 5
(b) mu minsi 8
c) mu minsi 15
d) nta gisubizo cy’ukuri kirimo

146. Kunyuranaho bikorerwa:
a) mu ruhande rw’iburyo gusa
b) igihe cyose ni ibumoso
c) iburyo iyo unyura ku nyamaswa
(d) nta gisubizo cy’ukuri kirimo

147. Iyo ubugari bw’inzira nyabagendwa igenderwamo n’ibinyabiziga budahagije kugirango bibisikane nta nkomyi abagenzi bategetswe:
a) kunyura mu nzira z’impande z’abanyamaguru
b) guhagarara aho bageze
(c) koroherana
d) gukuraho inkomyi

148. Umuyobozi ugenda mu muhanda igihe ubugari bwawo budatuma anyuranaho nta nkomyi ashobora kunyura mu kayira k’abanyamaguru ariko amaze kureba ibi bikurikira:
a) umuvuduko w’abanyamaguru
b) ubugari bw’umuhanda
c) umubare w’abanyamaguru
(d) nta gisubizo cy’ukuri kirimo

149. Icyapa cyerekana umuvuduko ntarengwa ikinyabiziga kitagomba kurenza gishyirwa ku binyabiziga bifite uburebure ntarengwa bukurikira:
a) burenga toni 1
b) burenga toni 2
c) burenga toni 24
(d) nta gisubizo cy’ukuri kirimo

150. Iyo nta mategeko awugabanya by’umwihariko, umuvuduko ntarengwa w’amapikipiki mu isaha ni:
a) km 25
b) km 70
c) km 40
(d) nta gisubizo cy’ukuri kirimo

151. Ahatari mu nsisiro umuvuduko ntarengwa wa velomoteri mu isaha ni:
(a) km 50
b) km 40
c) km 30
d) nta gisubizo cy’ukuri kirimo

152. Birabujijwe guhagarara akanya kanini aha hakurikira:
a) mu duhanda tw’abanyamagare
b) mu duhanda twagenewe velomoteri
(c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

153. Amatara maremare y’ikinyabiziga agomba kutamurika mu bihe bikurikira:
a) iyo umuhanda umurikiwe umuyobozi abasha kureba muri m 200
(b) iyo ikinyabiziga kigiye kubisikana nikindi
c) iyo ari mu nsisiro
d) ibisubizo byose nibyo

154. Ubugari bwa romoruki ikuruwe n’igare cyangwa velomoteri ntiburenza ibipimo bikurikira:
a) cm 25
b) cm 125
c) cm 45
(d) nta gisubizo cy’ukuri kirimo

155. Uburyo bukoreshwa kugirango ikinyabiziga kigende gahoro igihe feri idakora neza bwitwa:
a) feri y’urugendo
b) feri yo guhagarara
(c) feri yo gutabara
d) Nta gisubizo cy’ukuri kirimo

156. Nta mwanya n’umwe feri ifungiraho ushobora kurekurana n’ibiziga keretse:
a) iyo bireba feri y’urugendo
b) iyo kurekurana ari ibyakanya gato
c) iyo bireba feri yo guhagarara umwanya munini, ubwo kurekurana bikaba bidashoboka bidakozwe n'umuyobozi
(d) byose ni ibisubizo by’ukuri

157. Ikinyabiziga ntigishobora kugira amatara arenze abiri y’ubwoko bumwe keretse kubyerekeye amatara akurikira:
a) itara ndangamubyimba
b) itara ryerekana icyerekezo
c) itara ndangaburumbarare
(d) ibisubizo byose ni ukuri

158. Itara ndanganyuma rigomba gushyirwa aha hakurikira:
a) ku nguni y’iburyo y’ikinyabiziga
b) ku gice cy’inyuma ku kinyabiziga
(c) ahegereye inguni y’ibumoso y’ikinyabiziga
d) ibisubizo byose ni ukuri

159. Nibura ikinyabiziga gitegetswe kugira uduhanagurabirahuri dukurikira:
a) 2
b) 3
(c) 1
d) nta gisubizo cy’ukuri kirimo

160. Ibiziga by’ibinyabiziga bigendeshwa na moteri n’ibya velomoteri kimwe n’ibya romoruki zabyo bigomba kuba byambaye inziga zihagwa zifite amano n’ubujyakuzimu butari munsi ya milimetero imwe ku migongo yabyo yose, n’ubudodo bwabyo ntibugire ahantu na hamwe bugaragara kdi ntibigire aho byacitse bikomeye mu mpande zabyo. Ariko ibyo ntibikurikizwa ku binyabiziga bikurikira:
(a) ibinyabiziga bidapakiye kdi bitajya birenza umuvuduko wa km 25 mu isaha ahateganye
b) ibinyabiziga bya police bijya ahatarenga km 25 uvuye aho biba
c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

161. Birabujijwe kugenza ibinyabiziga bigendeshwa na moteri na za romoruki zikururwa nabyo, iyo ibiziga byambaye inziga zidahagwa cyangwa inziga zikururuka zifite umubyimba uri hasi ya cm 4. Ariko ibyo ntibikurikizwa ku binyabiziga bikurikira:
a) ku binyabiziga by’ingabo 
(b) ibinyabiziga bihinga iyo bigendeshwa mu karere katarenga km 25 uvuye aho ziba
c) ibinyabiziga bya police
d) nta gisubizo cy’ukuri kirimo

162. Imirongo yera iteganye n’umurongo ugabanya umuhanda mo kabiri mu burebure bwawo ugaragaza:
a) ahanyurwa n’amagare na velomoteri
b) ahanyurwa n’ingorofani n’ibinyamitende
(c) ahanyurwa n’abanyamaguru
d) nta gisubizo cy’ukuri kirimo

163. Iyo harimo indi myanya birabujijwe gutwara ku ntebe y’imbere y’imodoka abana badafite imyaka ikurikira: 
a) imyaka 10
(b) imyaka 12
c) imyaka 7
d) nta gisubizocy’ukuri kirimo

164. Iyo ikinyabiziga kitagikora cyangwa cyoherejwe mu mahanga burundu ibyapa ndanga bigomba gukurwaho bikoherezwa mu biro by’imisoro, ibyo bikorwa mu gihe kingana gute:
a) ibyumweru bibiri
(b) amezi abiri
c) ukwezi kumwe
d) nta gisubizo cy’ukuri kirimo

165. Inkombe z’inzira nyabagendwa cyangwa z’umuhanda zishobora kugaragazwa n’ibikoresho ngarurarumuri ibyo bikoresho bigomba gushyirwaho ku buryo abagenzi babibona ku buryo bukurikira:
a) babona gusa ibumoso bwabo ibyibara ryera
b) iburyo babona iby’ibara ritukura cyangwa risa n’icunga rihishije gusa
(c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

166. Iyo kuyobya umuhanda ari ngombwa bigaragazwa kuva aho uhera no kuburebure bwawo n’icyapa gifite ubuso bw’amabara akurikira:
a) umukara 
b) umweru 
c) umutuku
(d) nta gisubizo cy’ukuri kirimo

167. Ku mihanda yagenwe na minisitiri ubifite mu nshingano ibyapa biburira n’ibyapa byerekana bigomba kugaragazwa kuva bwije kugera bukeye n’urumuri rwihariye cyangwa amatara ku mihanda cyangwa ibintu ngarurarumuri. Igihe ijuru rikeye intera y’ahagaragara igomba kuba nibura:
a) m50 
b) m120 
c) m150 
(d) nta gisubizo cy’ukuri kirimo

168. Ibizirikisho by’iminyururu cyangwa by’insinga kimwe n’ibindi by’ingoboka bikoreshwa gusa igihe nta kundi umuntu yabigenza kandi nta kindi bigiriwe uretse gusa kugirango ikinyabiziga kigere aho kigomba gukorerwa kandi nturenze na rimwe km 20 mu isaha, ibyo bizirikisho bigaragazwa ku buryo bukurikira:
a) agatambaro gatukura kuri cm 50 z’umuhanda 
b) ikimenyetso cy’itara risa n’icunga rihishije 
(c) icyapa cyera cya mpande enye zingana gifite cm 30 kuri buri ruhande
d) nta gisubizo cy’ukuri kirimo

169. Uretse mu mijyi, kuyindi mihanda yagenywe na minisiteri ushinzwe gutwara ibintu n’abantu, uburemere ntarengwa bwemewe ku binyabiziga bifatanye bifite imitambiko itatu ni:
(a) toni 12 
b) toni 16 
c) toni 10 
d) nta gisubizo cy’ukuri kirimo

170. Uretse mu mujyi kuyindi mihanda yajyenwe na minisitiri ushinzwe gutwara abantu n’ibintu, uburemere ntarengwa ku binyabiziga bifite imitambiko itatu cyangwa irenga hatarimo mukuzungu ni :
a) toni 10 
b) toni 12 
c) toni 15 
(d) nta gisubizo cy’ukuri kirimo

171. Iyo nta mategeko awugabanya by’umwihariko umuvuduko ntarengwa ku modoka zidafite ibizibuza kwiceka kuberako ariko zakozwe ni:
a) km 70 mu isaha 
b) km 40 mu isaha 
(c) km 25 mu isaha
d) km20 mu isaha

172. Iyo nta mategeko awugabanya by’umwihariko umuvuduko ntarengwa ku modoka zidafite ibizibuza kwiceka kuberako ariko zakozwe ni:
a) km 20 mu isaha 
b) km 40 mu isaha 
c) km 35 mu isaha 
(d) nta gisubizo cy’ukuri kirimo

173. Ikinyabiziga kibujijwe guhagarara akanya kanini aha hakurikira :
(a) imbere y’ahantu nyabagendwa hinjirwa n’ahasohokerwa n’abantu benshi
b) mu muhanda aho ugabanyijemo ibisate bigaragazwa n’imirongo icagaguye 
c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

174. Iyo kuva bwije kugeza bukeye cyangwa bitewe n’uko ibihe bimeze nk’igihe cy’ibihu cyangwa cy’imvura bitagishoboka kubona neza muri m 200, udutsiko twose tw’abanyamaguru nk’imperekerane cyangwa udutsiko tw’abanyeshuri bari ku murongo bayobowe n’umwarimu, iyo bagenda mu muhanda ku isonga hakaba hari abantu barenze umwe bagomba kugaragazwa kuburyo bukurikira:
a) imbere ni itara ry’umuhondo ritwariwe ibumoso
(b) inyuma ni itara ryumutuku ritwariwe ibumoso n’umuntu uri ku murongo w’inyuma hafi y’umurongo ugabanya umuhanda mo kabiri
c) A na B ni ibisubizo by’ukuri
d) nta gisubizo cy’ukuri kirimo

175. Imburira zimurika zemerewe gukoreshwa kugirango bamenyeshe umuyobozi ko bagiye kumunyuraho aha hakurikira:
(a) mu nsisiro cyangwa ahandi hose
b) ahegereye inyamaswa zikurura
c) hafi y’amatungo 
d) nta gisubizo cy’ukuri kirimo

176. Ibinyabiziga bifite ubugari bufite ibipimo bikurikira bigomba kugira amatara ndangaburumbarare:
a) metero 3
b) metero 2 na cm 50
c) metero 1 na cm 10
(d) nta gisubizo cy’ukuri kirimo

177. Nta tara na rimwe cyangwa akagarurarumuri bishobora kuba bifunze kuburyo igice cyabyo cyo hasi cyane kimurika kiba kiri hasi y’ibipimo bikurikira kuva ku butaka igihe ikinyabiziga kidapakiye:
a) cm 30 
b) cm 20 
c) cm 50 
(d) nta gisubizo cy’ukuri kirimo

178. Ahari hejuru cyane y’ubuso bumurika h’amatara ndangambere na ndanganyuma ntihashobora kuba aharenze ibipimo bikurikira hejuru y’ubutaka iyo ikinyabiziga kidapakiye:
a) m1 na cm 50 
b) m1 na cm 75
c) m 1 na cm 80
(d) nta gisubizo cy’ukuri kirimo

179. Buri modoka cyangwa buri romoruki ikuruwe n’iyo modoka bishobora kugira itara risa n’icyatsi kibisi bituma umuyobozi yerekana ko yabonye ikimenyetso cy’uwitegura kumunyuraho. Iryo tara rigomba gushyirwa aha hakurikira:
a) hafi y’inguni y’ibumoso bw’ikinyabiziga
(b) inyuma hafi y’impera y’ibumoso bw’ikinyabiziga
c) inyuma ahegereye inguni y’iburyo
d) nta gisubizo cy’ukuri kirimo

180. Ubugari bw’imizigo yikorewe n’ipikipiki ifite akanyabiziga ko kuruhande kimwe n’ubwa romoruki ikuruwe na bene icyo kinyabiziga ntibushobora kurenza ibipimo bikurikira ku bugari bw’icyo kinyabiziga kidapakiye:
a) m 1.25 
(b) cm 30 
c) cm 75 
d) nta gisubizo cy’ukuri kirimo

181. Mu gihe telefone yawe ihamagawe utwaye imodoka wakora iki?
a) Kwitaba cyangwa guhagarara ako kanya 
b) kutayitaba 
(c) Gushyira imodoka iruhande ukayitaba 
d) B na c ni ibisubizo byukuri

182. Niki wakora mbere y’uko uhindura icyerekezo?
a) Gutanga ikimenyetso cy’ukuboko no gukoresha amatara ndangacyerekezo.
b) Itegereze neza niba icyapa kikwemerera guhindura icyerekezo.
(c) A na B n’ibisubizo by’ukuri
d) Nta gisubizo cy’ukuri kirimo

183. Niki muribi wakwirinda mugihe ushaka kunyuranaho?
(a) Nyuma y’ikona ugategereza kubona uburyo bwo kunyuranaho.
b) Mumuhanda w’icyerekezo kimwe
c) Aho utagomba kurenza ibirometero 30 mu isaha.
d) Ugeze mumuhanda utaringaniye neza

184. Niki wakora mugihe usanze mu bimenyetso bimurika harimo ibara ry’umuhondo?
a) Kongera umuvuduko
b) Kugumana umuvuduko wari uriho.
(c) Kwitegura guhagarara.
d) Gufata feri cyane.

185. Mugihe ukurikiranye na romoruki, n’ukubera iki ugomba gusiga umwanya uhagije hagati yawe nayo?
a) Bituma ubasha gukata ikorosi vuba.
(b) Bifasha umuyobozi wa romoruki kukurebera mundorerwamo.
c) Bifasha romoruki guhagarara byoroshye. 
d) Bikurinda umuyaga.

186. Utegereje gukata iburyo kwiherezo ry’umuhanda ukingirijwe n'imodoka ihagaze. Niki wakora?
(a) Guhagarara hanyuma ukagenda gake gake witonze kugezaho ureba neza.
b) Kwihuta wegera imbere aho ushobora kureba ugafunga ikindi cyerekezo.
c) Gutegereza abanyamaguru bakakumenyesha ko ntakibazo wakata.
d) Guhindukiza imodoka vuba kugirango ushake indi nzira wakoresha.

187. Mugihe uri murugendo rurerure mumuhanda urombereje w’ibice byinshi, niki wakora mugihe wumva utangiye kugira ibitotsi?
a) Gucuranga umuziki cyane.
b) Kwihuta cyane kugirango usoze urugendo vuba.
(c) Kuva mumuhanda urombereje w’ibice byinshi, ugahagarara ahantu hatekanye.
d) Ntagisubizo cy’ukuri kirimo.

188. Kuki ugomba gucana amatara mugihe hatangiye kwijima?
a) Kugirango akerekanamuvuduko kagaragare neza.
(b) Kugirango abandi biborohere kukubona.
c) Kugira ngo ujyane nabandi bayobozi bibinyabiziga.
d) Kuko amatara yo ku muhanda ari kwaka

189. Urimo kugenda munzira nyabagendwa ni gute wanyura k’umuyobozi w’igare?
a) Kuvuza ihoni mugihe umunyuraho
b) Kumunyuraho umwegereye 
(c) Gusiga umwanya uhagije igihe umunyuraho 
d) Kugabanya umuvuduko mbere y’uko umunyuraho

190. Niki wakora igihe utabona neza usubira inyuma ?
a) Kumanura ikirahure cy’imodoka urebe inyuma
b) Gufungura umuryango w’imodoka ureba inyuma 
(c) Gushaka umuntu uri hanze y’ikinyabiziga ukuyobora
d) Gukoresha akarebanyuma kakwegereye

191. Igihe ukurikiwe n’ikinyabiziga gitwara abarwayi gicanye amatara y’intabaza arabagirana. Wakora iki ?
(a) Kugihigamira ako kanya ndetse byaba ngombwa ugahagarara
b) Kongera umuvuduko kugirango ugisige
c) Kugumana umuvuduko wari ufite 
d) Guhagarara bitunguranye mu muhanda

192. Wifuza kugana ibumoso imbere yawe. Kubera iki ushaka umwanya mwiza kandi uhagije?
a) Kwemerera abandi bayobozi b’ibinyabiziga kugutambukaho
b) Kugirango ubone neza ikindi kerekezo ushaka gufata 
(c) Kugirango ufashe abandi bose bakoresha umuhanda kumenya icyo ushaka gukora 
d) Kwemerera abandi bayobozi b’ibinyabiziga kukunyura muruhande rw’ibumoso

193. Utwaye ikinyabiziga inyuma ya romoruki, umuyobozi wayo akaguha ikimenyetso cyo kumutambukaho iburyo kandi ugana ibumoso, wakora iki ?
(a) Kugabanya umuvuduko ukareka akagenda 
b) Gukomeza iburyo bwawe 
c) Kumunyuraho iburyo bwe 
d) Kugumana umuvuduko wari ufite ukamuvugiriza ihoni

194. Wegereye inzira y’abanyamaguru ugasanga bategereje kwambuka. Ugomba gukora iki?
a) Kureka abakuze n’abafite ubumuga bagatambuka mbere 
(b) Kugabanya umuvuduko witegura guhagarara
c) Gukoresha amatara abamenyesha kwambuka 
d) Gukoresha ibimenyetso byamaboko bibemerera kwambuka

195. Uri hafi kunyura k’umuyobozi w’ikinyamitende. Muri ibi byapa bikurikira nikihe wakwitondera?
(a) Icyapa kiburira cy'abanyamagare (A4)
b) Icyapa kibuza amagare (C3a)
c) Icyapa cy'icyerekezo kibuza (C1)
d) Nta cyapa gihari

196. Kumanywa urumuri rudahagije hatabona neza. Ni ayahe matara y’urugendo ugomba gukoresha?
a) Amatara yo kubisika na matara kamena-bihu.
(b) Amatara kamena-bihu y’imbere
c) Amatara yo kubisikana 
d) Amatara kamena-bihu y’inyuma

197. Niyihe mpamvu ituma tugomba kugabanya umuvuduko mugihe hari ibihu ?
a) Igihe feri idakora 
b) Igihe uhumishijwe n’amatara yo kubisikana 
c) Igihe moteri imara ngo izime 
(d) Nuko biba bitoroshye kubona ikiri imbere

198. Niki ugomba gukora igihe uhagaze ku muhanda igihe cy’ibihu?
(a) Kureka amatara ndanga akaguma yaka 
b) Kureka amatara yo kubisikana na kamena-bihu akaguma yaka 
c) Kureka amatara yo kubisikana akaguma yaka 
d) Kureka amatara y’urugendo akaguma yaka

199. Iki cyapa cy'uruziga rw'ubururu rurimo 30 y'umweru cyivuga iki?
a) Umuvuduko ntarengwa 30 km/h 
(b) Iherezo ry’umuvuduko muke ntarengwa utegetswe
c) Umuvuduko uri hejuru 30 km/h
d) Inzira y'abanyamaguru

200. Icyapa cy'uruziga rutukuru rurimo umurongo utambitse w'ubururu (No Parking) kivuze iki?
a) Ntihanyurwa 
(b) Birabujijwe guhagarara umwanya munini (Stationnement interdit)
c) Umuvuduko utarengeje 
d) Inzira yabanyeshuli

201. Inzira nyabagendwa ifite ibyerekezo bibiri, uruhande rw’ibumoso rudufasha iki ?
a) Kunyuranaho gusa, ntugaruke iburyo bwawe 
(b) Kunyuranaho cyangwa ugakatira ibumoso 
c) Hemerewe kugenda imodoka zihuta gusa 
d) Gukatira iburyo gusa utanyuranyeho

202. Ni hehe byemewe kunyuranaho munzira y’icyerekezo kimwe?
(a) Ku gisate kiri Ibumoso bw’umuhanda 
b) Kunyuranaho ntibyemewe 
c) Ku gisate kiri iburyo bw’umuhanda gusa 
d) Ku gisate cy’ibumoso cyangwa iburyo

203. N’uwuhe muntu ushobora gusimbura ibimenyetso byo mumuhanda, dutegetswe kubaha?
a) Umuyobozi w’ikinyamitende 
b) Umunyamaguru
(c) Umukozi ubifitiye ububasha (Polisi cyangwa Umugenzuzi)
d) Umuyobozi wa bisi

204. Icyapa cy'uruziga rw'umweru rurimo umurongo wirabura wambuka (Fin de toutes interdictions) gisobanura iki ?
(a) Iherezo ry’ibibuzwa byose mu karere ku binyabiziga bigenda 
b) Ntihemerewe kuhahagarara
c) Umuvuduko ntarengwa wemewe
d) Nta gisubizo cy’ukuri kirimo

205. Ibyapa bitegeka bikozwe muyihe shusho?
a) Ishusho y'urukiramende
b) Ishusho ya mpandeshatu
(c) Ishusho y'uruziga (Disque)
d) Ishusho ya mpandenye

206. Nikihe cyapa cyerekena ko nta kinyabiziga gifite moteri cyemerewe kuhanyura?
a) Icyapa cyo guhagarara umwanya muto n'umunini
(b) Icyapa kirimo ipikipiki n'imodoka mu ruziga rutukura (C3)
c) Iherezo ry'ibibuzwa
d) Akamenyetso k'ibumoso

207. Icyapa cy'uruziga rutukuru rurimo imodoka ebyiri (imwe itukura indi yirabura) gisobanura iki ?
a) Uburenganzira bwo gutambuka mbere 
b) Nta kinyabiziga kigendeshwa na moteri 
c) Ibyerekezo bibiri by’umuhanda 
(d) Birabujijwe kunyuranaho (Interdiction de dépasser)

208. Icyapa cy'uruziga rutukuru rurimo ikimenyetso cy'umusaraba w'ubururu (X itukura mu cyatsi/ubururu) kivuze iki ?
a) Umuvuduko ntarengwa wemewe 
b) Iherezo ry’ibyo wabuzwaga
(c) Guhagarara umwanya munini n’umwanya muto ntibyemewe (Arrêt et stationnement interdits)
d) Birabujijwe kuhinjira

209. Icyapa cya mpandeshatu irimo imyambi itatu izenguruka kimenyesha iki?
a) Umuhanda uzenguruka 
b) Igice cy’umuhanda uzenguruka 
(c) Aho banyura bazengurutse (Rond-point imbere)
d) Ibisubizo byose nibyo

210. Icyapa cya mpandeshatu irimo uduce tubiri twazamutse (Umuhanda utaringaniye / Cassis) gisobanura iki?
a) Iteme ridahoraho
(b) Umuhanda utaringaniye 
c) Umuhanda w’injira mu kuzimu 
d) Ubutaka bworoshye

211. Icyapa cya mpandeshatu irimo ikirangantego cy'umuyaga (Manche à air) gisobanura iki?
(a) Umuyaga w’intambike (Vent latéral)
b) Urusaku rwo mu muhanda 
c) Ikibuga cy’indege 
d) Ibisubizo byose nibyo

212. Icyapa cy'urukiramende rw'ubururu rurimo ikiraro cyaciwemo kabiri n'umurongo utukura gisobanura iki?
a) Iherezo Ry’inzira Y’abanyamaguru 
(b) Iherezo Ry’umuhanda Urombereje W’ibice Byinshi (Fin d'autoroute)
c) A Na B Ni Ibisubizo By’ukuri 
d) Nta nzira ihari

213. Icyapa cya mpandeshatu irimo umuhanda uhurira hagati ufunganira impande zombi gisobanura iki?
a) Iherezo Ry’umuhanda Wi Byerekezo Bibiri 
b) Iteme rinini Kandi rirerire 
(c) Ifungana Ry’umuhanda (Chaussée rétrécie)
d) Iherezo ry’iteme rifunganye

214. Icyapa cy'urukiramende rw'ubururu rurimo inyuguti ya T y'umweru n'umutuku hejuru gisobanura iki?
a) Isangano rifite ishusho ya T
(b) Inzira idakomeza (Cul-de-sac)
c) Aho baterefonera 
d) Nta gisubizo cy’ukuri

215. Icyapa cya mpandeshatu irimo abanyamaguru bambuka mu mirongo yera gisobanura iki?
a) Inzira y’abanyeshuri 
b) Abanyamaguru ntibemerewe 
c) Agace k’abanyamaguru nta kinyabiziga 
(d) Hegereye aho abanyamaguru bambukira (Passage pour piétons)

216. Wakora iki ubonye icyapa cya STOP (B2)?
a) Guhagarara gusa igihe ibinyabiziga bikwegereye 
(b) Guhagarara niyo nta kinyabiziga ubona (Arrêt obligatoire)
c) Guhagarara gusa niba hari abana bategereje kwambuka 
d) Guhagarara gusa igihe ikimenyetso cyaka ari umutuku

217. Icyapa cya mpandeshatu irimo imodoka igwa mu mazi gisobanura iki?
(a) Uguhinguka ku mwaro cyangwa ku nkombe cyangwa ahegereye icyome (Débouché sur un quai)
b) Inzira nyabagendwa iri kumusozi ucuramye 
c) Umuhanda utaringaniye 
d) Umuhanda wangijwe n’isuri

218. Icyapa cy'uruziga rutukuru rurimo ipikipiki yirabura gisobanura iki?
a) Hanyurwa na velomoteri gusa 
b) Nta modoka 
c) Hanyurwa nimodoka gusa 
(d) Ntihanyurwa n’amapikipiki (Accès interdit aux motocycles)

219. Icyapa gitanga uburenganzira bwo gutambuka mbere (Cédez le passage) kigira iyihe shusho?
a) Ishusho ya mpandeshatu itunze hejuru
b) Ishusho y'uruziga
c) Ishusho ya mpandenye
(d) Ishusho ya mpandeshatu icuritse (ihindukije umutwe hasi - B1)

220. Icyapa cya mpandeshatu irimo uruzitiro rwa gari ya moshi gisobanura iki?
(a) Ahegereye amasangano y’inzira nyabagendwa n’inzira ya gari ya moshi ibambiye (Passage à niveau avec barrières)
b) Inzira ibambiye imbere 
c) Inzira itabambiye itanafunze 
d) Imbere hari ikiraro cy’amatungo

221. Icyapa cya mpandeshatu irimo 10% ku gacuri kamanuka gisobanura iki?
a) Umuhanda wubatswe nabi 
(b) Agacuri kateza ibyago (Descente dangereuse)
c) Umuhanda utaringaniye 
d) Akazamuko gahanamye

222. Icyapa cy'urukiramende rw'ubururu rurimo umwambi w'umweru ukatira hejuru n'akandi kanyura ku ruhande gisobanura iki?
a) Guhindura icyerekezo ibumoso ugana aho bahagarara
(b) Umuhanda udakomeza 
c) Nti byemewe guhindura icyerekezo ibumoso
d) Guhindura ikirekezo ibumoso ugana ku cyome

223. Mu bimenyetso bimurika itara ritukura rivuga iki ?
a) Hagarara keretse niba ushaka gukata ibumoso 
b) Hagarara niba ubona ntabyago byaguteza 
(c) Birabujijwe kurenga icyo kimenyetso (Feu rouge: interdiction formelle)
d) Wemerewe kugenda niba aho asohokera mu masangano y’umuhanda hafunze

224. Mu bimenyetso bimurika itara ry’umuhondo risobanura iki ?
a) Itegure kugenda 
(b) Birabujijwe gutambuka umurongo wo guhagarara umwanya muto cg igihe uwo murongo udahari icyo kimenyetso ubwacyo
c) A na b ni ibisubizo by’ukuri 
d) Nta gisubizo cy’ukuri kirimo

225. Mu bimenyetso bimurika itara ry’icyatsi risobanura iki ?
a) Kwitegura kugenda 
(b) Uburenganzira bwo kurenga icyo kimenyetso (Feu vert: passage libre)
c) Hagarara niba inzira isohoka mu isangano ry’imihanda ifunze 
d) Ntagisubizo cyukuri kirimo

226. Umurongo wera urombereje udacagaguye mu muhanda usobanura iki?
(a) Birabujijwe kuwurenga (Ligne continue)
b) Biremewe kuwurenga mu gihe unyuranaho
c) Ahanyurwa n'amagare
d) Inzira y'abanyamaguru

227. Icyapa cya mpandeshatu irimo imyambi ibiri inyuranamo (umwe uzamuka undi umanuka) gisobanura iki?
(a) Ukugendera mu muhanda ubisikanirwamo (Circulation dans les deux sens)
b) Ukugendera mu muhanda ubisikanirwamo ntibyemewe
c) Cyerekana aho umunyegare agomba kunyura 
d) Nta gisubizo cy’ukuri kirimo

228. Icyapa cy'uruziga rw'ubururu rurimo umubare 30 mu cyera gisobanura iki?
a) Ahatangirwa serivisi ni muri metero 30.
b) Umuvuduko munini ntarengwa utegetswe ni 30 km/h.
(c) Umuvuduko muto ntarengwa utegetswe ni 30 km/h (Vitesse minimale obligatoire).
d) Aho ibinyabiziga bihagarara ni imbere mu birometero 30.

229. Icyapa cya mpandeshatu irimo ikimenyetso cyo gutangara (!) gisobanura iki?
a) Ahegereye umuhanda unyerera.
b) Imbere ipine ryapfumutse.
(c) Ahegereye icyago kidasobanuye ukundi (Danger indéterminé)
d) Imbere hari hatangirwa serivisi.

230. Icyapa cya mpandeshatu irimo gari ya moshi y'umukara icana umwotsi gisobanura iki?
a) Imbere hari umuyobozi w’amatungo.
b) Imbere hari inzira ya gari ya moshi ibambiye.
(c) Ahegereye amasangano y’inzira nyabagendwa n’inzira ya gari ya moshi hatabambiye (Passage à niveau sans barrières)
d) Inkomane ibambiye.
"""

def parse_questions():
    pattern = re.compile(r'(\d+)\.\s*(.*?)(?=\n\s*[a-d]\)|\n\s*\([a-d]\))(.*?)(?=\n\s*\d+\.|\Z)', re.DOTALL)
    blocks = re.findall(r'(\d+)\.\s*(.*?)(?=\n\s*\d+\.|\Z)', raw_ocr.strip(), re.DOTALL)
    
    questions = []
    for num_str, content in blocks:
        lines = [l.strip() for l in content.strip().split('\n') if l.strip()]
        if not lines:
            continue
        
        # Question text is everything before the first option (a), b), etc.
        q_text_lines = []
        options = []
        correct_id = 'a'
        
        current_opt_id = None
        current_opt_text = []
        
        for line in lines:
            opt_match = re.match(r'^\(?([a-d])\)?[\.\)]?\s*(.*)', line, re.IGNORECASE)
            if opt_match and opt_match.group(1).lower() in ['a', 'b', 'c', 'd']:
                if current_opt_id:
                    options.append({'id': current_opt_id, 'text': ' '.join(current_opt_text).strip()})
                
                is_correct = '(' in line and ')' in line and line.index('(') < line.index(opt_match.group(1))
                # or check if line has (a), (b), (c), (d)
                if re.search(r'\([a-d]\)', line, re.IGNORECASE):
                    correct_id = opt_match.group(1).lower()
                
                current_opt_id = opt_match.group(1).lower()
                clean_text = opt_match.group(2).strip()
                current_opt_text = [clean_text]
            else:
                if current_opt_id is None:
                    q_text_lines.append(line)
                else:
                    current_opt_text.append(line)
        
        if current_opt_id:
            options.append({'id': current_opt_id, 'text': ' '.join(current_opt_text).strip()})
        
        q_title = ' '.join(q_text_lines).strip()
        num = int(num_str)
        
        # Category estimation
        cat = 'amategeko'
        title_lower = q_title.lower()
        if 'icyapa' in title_lower or 'ibyapa' in title_lower or 'kimenyetso' in title_lower:
            cat = 'ibyapa'
        elif 'feri' in title_lower or 'moteri' in title_lower or 'romoruki' in title_lower or 'ubugari' in title_lower or 'ton' in title_lower:
            cat = 'ibinyabiziga'
        elif 'itara' in title_lower or 'amatara' in title_lower or 'ngarurarumuri' in title_lower:
            cat = 'amatara'
        elif 'umuvuduko' in title_lower or 'ihoni' in title_lower:
            cat = 'umuvuduko'
        elif 'impanuka' in title_lower or 'ubutabazi' in title_lower or 'ubwitegure' in title_lower:
            cat = 'umutekano'

        questions.append({
            'id': f'rnp-q-{num}',
            'number': num,
            'question': q_title,
            'options': options,
            'correctAnswerId': correct_id,
            'category': cat
        })

    return questions

questions = parse_questions()
print(f"Parsed {len(questions)} official questions from the user PDF!")

with open('/tmp/parsed_rnp_questions.json', 'w', encoding='utf-8') as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)
