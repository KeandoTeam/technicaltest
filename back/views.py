from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from back.models import User
from .serializer import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .validators import myValidateUserCreate
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated

@csrf_exempt
@api_view(['POST'])
def create_user(request):
    """
    endpoint for user registration
    ---
    :param request: The HTTP request containing the data of the user to be created.
      - return: A JSON object containing the data of the newly created user
      - name: first_name
        type: string
        required: false
        description: The user's name.
      - name: last_name
        type: string
        required: false
        description: The user's last name.
      - name: date_birth
        type: date
        required: false
        description: The user's date of birth.
      - name: address
        type: string
        required: false
        description: The user's address.
      - name: token
        type: string
        required: true
        description: The user's token.
      - name: password
        type: string
        required: false
        description: The user's password.
      - name: mobile_phone
        type: string
        required: false
        description: The user's cell phone number.
      - name: email
        type: string
        required: false
    """
    if request.method == 'POST':
        u = User(
            fullname=request.POST.get('fullname'),
            date_birth=request.POST.get('date_birth'),
            mobile_phone=request.POST.get('mobile_phone'),
            address=request.POST.get('address'),
            password=make_password(request.POST.get('password')),
            email=request.POST.get('email'),)

        form = myValidateUserCreate(request.POST)

        if form.is_valid():
            u.save()
            data = {'message': 'Successfully Created User!', 'user': str(u)}
            return JsonResponse(data, status=status.HTTP_201_CREATED)
        else:
            form_errors = form.errors
            data = {'message': 'Error, data not found ', 'errors': form_errors}
            return JsonResponse(data,  status=status.HTTP_400_BAD_REQUEST)
    else:
      data = {'message': 'Error, method Error '}
      return JsonResponse(data, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@csrf_exempt
@api_view(['POST'])
def login(request):
    """
    Endpoint for user session 
    ---
    parameters:
      - name: mobile_phone
        required: true
        type: string
      - name: email
        required: true
        type: string
    """
    # User session
    if request.method == 'POST':
      mobile_phone = request.data.get('mobile_phone')
      user = User.objects.filter(mobile_phone=mobile_phone).first()
      if user.mobile_phone == mobile_phone:
          token = RefreshToken.for_user(user)
          response_data = {
              "user": {
                  "id": user.id,
                  "fullname": user.fullname,
                  "session_active": True,
                  "date_birth": user.date_birth,
                  "email": user.date_birth,
                  "mobile_phone": user.mobile_phone,
                  "password": user.password,
                  "address": user.address
              },
              "access_token": str(token),
              "token_type": "bearer"
          }
          return JsonResponse(response_data, status=status.HTTP_200_OK)
      else:
          data = {'message': 'Error, method Error '}
          return JsonResponse(data, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_users(request):
    """
      Endpoint for data all users
      ---
      parameters:
        - name: id
          type: integer
          required: false
          description: user id.
    """
    if request.method == 'GET':
      users = User.objects.all()
      user_list = []
      for user in users:
          user_info = {
            "id": user.id,
            "fullname": user.fullname,
            "date_birth": None,
            "mobile_phone": user.mobile_phone,
            "email": user.email,
            "address": None,
            "city_id": None,
            "session_active": True
        }
          user_list.append(user_info)
          data = {'message': 'Successfully'}
          return JsonResponse(user_list, status=status.HTTP_200_OK)
    else:
      data = {'message': 'Error, method Error '}
      return JsonResponse(data, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_user(request, id_user):
    """
      Endpoint for data user
      ---
      parameters:
        - name: id
          type: integer
          required: false
          description: user id.
    """
    if request.method == 'GET':
        user = User.objects.filter(id=id_user).first()
        user_info = {
            "id": user.id,
            "document_type_id": None,
            "document_number": None,
            "first_name": None,
            "last_name": None,
            "date_birth": None,
            "mobile_phone": user.mobile_phone,
            "email": user.email,
            "address": None,
            "city_id": None,
            "session_active": True
        }
        data = {'message': 'Successfully'}
        return JsonResponse(user_info,  status=status.HTTP_200_OK)
    else:  
      data = {'message': 'Error, method Error '}
      return JsonResponse(data, status=status.HTTP_405_METHOD_NOT_ALLOWED)  

@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_user(request, id_user):
    """
      Endpoint for Update
      ---
      parameters:
        - name: id
          type: integer
          required: false
          description: user id.
    """
    try:
        user = User.objects.get(id=id_user)
    except User.DoesNotExist:
        data = {'message': 'Error, method Error '}
        return JsonResponse(data, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def delete_user(request, id_user):
    """
      Endpoint for Update
      ---
      parameters:
        - name: id
          type: integer
          required: false
          description: user id.
    """
    try:
        user = User.objects.get(id=id_user)
        print()
        dataRespose = {
          "fullname": user.fullname,
          "date_birth": user.date_birth,
          "mobile_phone": user.mobile_phone,
          "email": user.email,
          "password":  user.password,
          "address":  user.address,
        }

    except User.DoesNotExist:
        return JsonResponse({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        # user.delete()
        data = {'user': dataRespose}
        return JsonResponse(data, status=status.HTTP_200_OK)
    else:
        return JsonResponse(status=status.HTTP_405_METHOD_NOT_ALLOWED)

