from rest_framework.views import APIView, Response, status
from drf_yasg.utils import swagger_auto_schema
from portal.models import Program
from ..serializers import AddAtributeTextSerializer, TagsSerializer


class TagView(APIView):
    @swagger_auto_schema(request_body=AddAtributeTextSerializer)
    def post(self, request):
        serializer = AddAtributeTextSerializer(data=request.data)
        if serializer.is_valid():
            key_name = serializer.validated_data['key_name']
            program = Program.objects.first()
            if not program:
                return Response({"error": "No Program found"}, status=status.HTTP_404_NOT_FOUND)
            list_of_tags = program.attributes.get("tags")
            if list_of_tags is None:
                program.attributes["tags"] = [key_name]
            else:
                program.attributes["tags"].append(key_name)
            program.save()
            return Response({"message": f"Key '{key_name}' added."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(responses={200: TagsSerializer()})
    def get(self, request):
        program = Program.objects.first()
        tags = program.attributes.get("tags", [])
        
        data = {"fadder_tags": tags, 
                "custom_free_text" : self.getFreeTextags(program.attributes), 
                "tag_groups":self.getMultivalueTags(program.attributes)}
        print(data)
        serializer = TagsSerializer(instance=data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(request_body=AddAtributeTextSerializer)
    def delete(self, request):
        serializer = AddAtributeTextSerializer(data=request.data)
        if serializer.is_valid():
            key_name = serializer.validated_data['key_name']
            program = Program.objects.first()
            if not program:
                return Response({"error": "No Program found"}, status=status.HTTP_404_NOT_FOUND)
            list_of_tags = program.attributes.get("tags")
            if list_of_tags is not None:
                if key_name in list_of_tags:
                    list_of_tags.remove(key_name)
            program.save()
            return Response({"message": f"Key '{key_name}' added."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    

    
    
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

