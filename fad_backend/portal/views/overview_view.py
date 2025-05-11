from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from portal.models import User, Program
from ..serializers import OverviewSerializer



class OverviewView(APIView):
    @swagger_auto_schema(responses={200: OverviewSerializer()})
    def get(self, request,filter = ""):
        print(f"Filter {filter}")
        program = Program.objects.first()
        users = self.checkFilter(filter, program)
        tags = program.attributes.get("tags", [])

        if users is not None:
            users_dict = [user.create_dict_to_serializers() for user in users]
        else:
            users_dict = []    
        data = {"fadder_tags": tags, 
                "custom_free_text" : self.getFreeTextags(program.attributes), 
                "tag_groups":self.getMultivalueTags(program.attributes)}
        
       
        serializer = OverviewSerializer(instance={
        'users': users_dict,
        'tags': data,
        'table_head' : program.get_tags_name(),
        'tagvalues_multivalue_name': program.getMultivalueTags()
        })
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def getFreeTextags(self, attributes):
        print(attributes)
        free_text = attributes.get("custom_free_text")
        if free_text is None:
            return []
        return free_text
      
    def getMultivalueTags(self, attributes):
        multivalueTags = {}
        for key, value in attributes.items():
            if isinstance(value,list) and key != "tags" and key != "custom_free_text": 
                multivalueTags[key] = value
        return multivalueTags
    

    def checkFilter(self, filter, program):
        if filter == "deafult":
            return program.users.all()
        splited_string = filter.split("=")
        kind_of_tag = splited_string[0]
        filter_value = splited_string[1]
        if kind_of_tag == "tags":
            return program.users.filter(attributes__tags__contains=[filter_value])
        elif kind_of_tag == "tags_custom":
            filter_key = f"attributes__{splited_string[2]}__contains"
            filter_kwargs = {filter_key: [filter_value]}
            return program.users.filter(**filter_kwargs)


    